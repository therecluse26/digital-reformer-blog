---
title: "Interplanetary Neckbeards: The Adventures of Running Linux on IPFS"
date: 2019-09-19T14:17:11-04:00
draft: true
tags: ["tech", "experimental", "tutorials", "linux", "ipfs"]
---

I bet when you opened this article, you thought that you were going to be reading yet another article about how to get IPFS up and running on Linux. Not here. There are a million others like that out there already, but how many teach you how to install a Linux root partition on IPFS? None. Exactly! What's the practical use of running your operating system off of a distributed, p2p cloud storage system, you ask? I'll answer by asking, why put a man on the moon? Why climb Mt. Everest? Why take on the herculean task of walking outside into direct sunlight at least once a week? For science!

Step one was to install IPFS on my local machine... easy enough. Just follow the instructions on https://dist.ipfs.io/#go-ipfs as they're pretty straightforward.

Step two was to get a functional Linux distro installed and all the base packages unpacked and bootable. The caveat here is that we're going to want to have direct access to all of these files after we complete said installation, and we'll also want to be able to bind an execution environment to these while in the cloud. How exactly do we accomplish all of this?

Chroot jails to the rescue! 

For those of you who don't know, `chroot` is a built-in Unix command that allows you to change the apparent root of a running process to the directory you specify. Yes, that's confusing, but you can think of it as an early precursor to container technology, and is actually a pretty common technique to use within the Linux ecosystems, particularly in setting up live environments and as part of the installation process for a lot of distros. While tools like `Docker` are a staple of current-day cloud architecture, it's a tad bit of overkill for what we're trying to accomplish here, and it'll actually be easier to accomplish with simple built-in Unix utilities.

So let's start by downloading our Arch `bootstrap image` (https://www.archlinux.org/download/) and unpacking it into a new directory under `/mnt` (this can go anywhere, I'm just following convention).




The much, *much* trickier part will be getting this to work on bare-metal hardware, but more on that later... one step at a time.






Now, as I said previously, getting this to run on bare-metal hardware is going to be quite a bit more legwork. We (un)fortunately will still need to mount our bootloader on local hardware, due to limitations

Persistance is another problem that we'll have to solve. IPFS being a distributed filesystem and all, we need peers in order to retain our data. There is no single centralized location storing this information (unless you only have 1 peer, I guess), so we'll need to get a peer hooked up to this and indexing everything.

Despite how absurd this obviously is, one nice side-effect of it is that I've effectively installed Linux onto an infinitely-sized drive. That's pretty cool, but we're still limited by the total storage availability of our peers, and we also require them to be seeding the data back to us in order for this to work. 



