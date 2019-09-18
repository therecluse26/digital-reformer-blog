#!/bin/bash
source .deploy.conf
rclone copy -vv --b2-hard-delete --b2-account=$account --b2-key=$key public $configName:$bucketName