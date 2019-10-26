---
title: "Cloud Retroarch"
date: 2019-10-12T22:33:12-04:00
draft: false
author: "therecluse26"
tags: ["cloud", "gaming", "tech"]
---

In today's installment of "let's cloud all the things," I want to give myself access to my wonderful RetroArch game library from more than just my Raspberry Pi. I want to be able to access my exact same games (with saves included) from any location. Can I pull it off? At the time of writing this sentence, I actually have no idea, but let's give it a shot!

First thing's first, choosing a cloud storage solution. My typical go-to for backup is Backblaze B2, because the price is virtually unmatched, however, they charge for egress traffic, so that'll add up fast if I'm accessing large .bin files on a routine basis. So since that's out, the next best option seems to be Wasabi. Similar pricing to B2, but no cost for egress, and they utilize a more standard S3 API (*Narrator: "It didn't"*)

So I went ahead, set up an account and a storage bucket, piece of cake. Now, the key to being able to access my game library from multiple machines is to mount my new bucket locally. For this, I found a handy utility called `s3fs`, which allows the mounting of Amazon S3 buckets onto a local filesystem, and since Wasabi is S3 compliant, it should work just fine.

s3fs requires a few things before allowing , so I had to do a small amount of legwork before I could successfully attach this storage locally. For starters, I need to get my access key and 

{{< highlight bash "linenos=table" >}}

echo [ACCESS_KEY]:[ACCESS_SECRET] > ~/.passwd-s3fs

s3fs -f -d retroarch-library /data/Games/Remote/RetroArch 
\ -o passwd_file=$HOME/.passwd-s3fs -o url=https://s3.wasabisys.com

{{< / highlight >}}


And I, having always been too cheap to use AWS for hosting anything, am unfamiliar with their S3 API and its associated access control policies.  After some quick googling, however, I was able to 



Almost there... I proceed to spin up a local instance of RetroPie, symlink my remote roms folder to my RetroPie one like so: `ln - ~/Games/Remote/RetroArch/roms ~/RetroPie/roms` and I fire up EmulationStation. Now's the moment of truth... aaaaand it runs like a potato (***sad trombone noises***). The load times are rendering this virtually unusable. But, it works... so that's a start, but it looks like we need to trash some of the work we just did.

After doing a bit of research, I found an alternative to s3fs that alows mounting to Wasabi called [goofys](https://github.com/kahing/goofys) (great name) that boasts significantly better performance. Following the instructions is fairly straightforward, however you may need to install some additional dependencies such first.

With that installed and running, I went ahead and rewrote my mounting script: 

{{< highlight bash "linenos=table" >}}
#!/bin/bash

$GOPATH/bin/goofys --endpoint https://s3.wasabisys.com retroarch-library /data/Games/Remote/RetroArch
{{< / highlight >}}

When I run this, I immediately notice and extreme difference in performance on the command line when navigating through mounted folders. *Great* sign! It looks like read performance is far better than s3fs, making it a much more viable solution for stateless games like NES and SNES, however I ran into some bugs with writing while using Wasabi. I try to `touch` or `cp` a file and am immediately greeted with this lovely message: `cp: failed to close 'Remote/RetroArch/{file_name}': No such file or directory` It looks like there are some kinks that need to be worked out. SO close!