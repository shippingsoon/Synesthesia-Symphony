#!/bin/bash

echo "{"
./dr_midi.pl $1 | awk '{if ($2 ~ /Program/){print $7": "$9","}}' | sed s/\\.//
echo "}"
