#!/bin/bash
LOCALDIR=$(cd `dirname $0` && pwd)
cd $LOCALDIR
sessionname=$1
sdpfilename=$2
window="streaming"
echo $sessionname


video=$5
audio=$6

window="streaming"

if [ "$video" = true ]; then
 echo "Video recording is stopped"
tmux send-keys -t "$sessionname:$window" "C-c" C-m
sleep 2
tmux send-keys -t "$sessionname:$window" "C-c" C-m
tmux send-keys -t "$sessionname:$window" "C-c" C-m
sleep 1
tmux send-keys -t "$sessionname:$window" "exit" C-m
rm ../sdp/$sdpfilename
tmux kill-session -t "$sessionname"
elif [ "$audio" = true ]; then
 echo "Audio recording is stopped"
sleep 5
tmux send-keys -t "$sessionname:$window" "C-c" C-m
sleep 5
tmux send-keys -t "$sessionname:$window" "exit" C-m
sleep 2
tmux send-keys -t "$sessionname:$window" "exit" C-m
rm ../sdp/$sdpfilename
tmux kill-session -t "$sessionname"
else
  echo "No recording is enabled"
fi



















#tmux send-keys -t "$sessionname:$window" "C-c" C-m
#sleep 2
#tmux send-keys -t "$sessionname:$window" "C-c" C-m
#tmux send-keys -t "$sessionname:$window" "C-c" C-m
#sleep 1
#tmux send-keys -t "$sessionname:$window" "exit" C-m
#rm ../sdp/$sdpfilename
#tmux kill-session -t "$sessionname"
