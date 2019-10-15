---
title: "Cloud Retroarch"
date: 2019-10-12T22:33:12-04:00
draft: false
author: "therecluse26"
tags: ["cloud", "gaming", "tech"]
---

In today's installment of "let's cloud all the things," I want to give myself access to my wonderful RetroArch game library from more than just my Raspberry Pi. I want to be able to access my exact same games (with saves included) from any location. Can I pull it off? At the time of writing this sentence, I actually have no idea, but let's give it a shot!

First thing's first, choosing a cloud storage solution. My typical go-to for backup is Backblaze B2, because the price is virtually unmatched, however, they charge for egress traffic, so that'll add up fast if I'm accessing large .bin files on a routine basis. So since that's out, the next best option seems to be Wasabi. Similar pricing to B2, but no cost for egress. Score! 

So I went ahead, set up an account and a storage bucket, piece of cake. Now, the key to being able to access my game library from multiple machines is to mount my new bucket locally. For this, I found a handy utility called `s3fs`, which allows the mounting of Amazon S3 buckets onto a local filesystem, and since Wasabi is S3 compliant, it should work just fine.

s3fs requires a few things before allowing , so I had to do a small amount of legwork before I could successfully attach this storage locally.

{{< highlight bash >}}

echo [ACCESS_KEY]:[ACCESS_SECRET] > ~/.passwd-s3fs

s3fs -f -d retroarch-library /data/Games/Remote/RetroArch 
\ -o passwd_file=$HOME/.passwd-s3fs -o url=https://s3.wasabisys.com

{{< / highlight >}}
