#!/usr/bin/perl
## Time-stamp: "1997-11-16 13:57:35 MST sburke@babel.ling.nwu.edu"
#
# midi_text: a MIDI text dumper.
#  Displays the bits of text (i.e., textual "meta-events") in a given
#   MIDI file.
#
# This is a stripped-down version of my program "Daktari MIDI"
# See http://www.ling.nwu.edu/~sburke/pub/dr_midi.html for more.
#
# Copyright 1997 by Sean M. Burke, sburke@ling.nwu.edu
###########################################################################
# Availability & Copying:
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# To see a copy of the GNU General Public License, see
# http://www.ling.nwu.edu/~sburke/gnu_release.html, or write to the
# Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.
###########################################################################

# Configurables here.

# Comment out (with a "#") any even types you don't want to see a dump of.

%meta_event_types = (  # All the meta-events we want a dump of
 0x01, "Text event", 
  #"Any amount of text describing anything."
 0x02, "Copyright text event",
  #"Contains a copyright notice as printable ASCII text."
 0x03, "Track name", 
  #This is what gets used for almost everything these days
 0x04, "Instrument name",
  #"A description of the type of instrumentation to be used in that track.
  # May be used with the MIDI Prefix meta-event to specify which MIDI channel
  # the description applies to, or the channel may be specified as text in the
  # event itself."
# 0x05, "Lyric", # used for syllables of lyrics.
  #"A lyric to be sung. Generally, each syllable will be a separate lyric event
  # which begins at the event's time."
 0x06, "Marker",
  #"Normally in a format 0 track, or the first track in a format 1 file. The
  # name of that point in the sequence, such as a rehearsal letter or section
  # name ("First Verse", etc.)."
 0x07, "Cue point",
  #"A description of something happening on a film or video screen or stage
  # at that point in the musical score ("Car crashes into house", "curtain
  # opens", "she slaps his face", etc.)"
);  

# End of configurables

###########################################################################
# For heaven's sake, don't try to use the workings of this script to
#  further your understanding of the MIDI file format.
#

die "No arguments\n" unless @ARGV;
$file = $ARGV[0];

die "Can't open $file \: $!\n" unless open(MIDI, "<$file");
binmode(MIDI);
print "File: $file\n";

die "Can't read header" unless read(MIDI, $in, 14); # the header length

die "Almost definitely not a MIDI file\n" unless substr($in, 0, 4) eq 'MThd';

Track_Chunk:
until(eof(MIDI)) {
   read(MIDI, $track_header, 8) || die "Can't read track header\n";
   ($id, $length) = unpack('A4N', $track_header);
   read(MIDI, $track_chunk, $length);
   next Track_Chunk unless $id eq 'MTrk'; # we don't want non-MTrk chunks

   $track_chunk =~ s/\x00\xFF\x2F\x00$//; # try to lop off an EOT metaevent
   next Track_Chunk if index($track_chunk, "\xFF") == -1 ;
   # Move on if there's no meta-events left, since we only care about those

   while(length($track_chunk)) { # analyze the event stream
     # Slice off the delta-time code
     next Track_Chunk unless $track_chunk =~ s/^[\x80-\xFF]*[\x00-\x7F]//;

     # Now let's see what we can make of the command
     $command = ord(substr($track_chunk,0,1));

     if ( $command < 0xF0 ) { # a MIDI event.  Parse and ignore!
       if($command & 0x80) { # if it's a real status byte
         $last_event_code = ($command &= 0xF0);
         $real_status = 1;
       } else {              # it has running status
         $command = $last_event_code;
         $real_status = 0;
       }

       if ($command == 0xC0 || $command == 0xD0) { # the only 1-byte statuses
         substr($track_chunk, 0, 1 + $real_status) = '';
       } else { # all the rest are 2-byte statuses
         substr($track_chunk, 0, 2 + $real_status) = '';
       }

     } elsif($command == 0xFF) { # It's a meta-event!  Whoohoo!
       next Track_Chunk
         unless $track_chunk =~ /^\xFF(.)([\x80-\xFF]*[\x00-\x7F])/;
       $type = $meta_event_types{ord($1)};
       $length = &read_variable_length($2);
       if($type){ # if it's something we wanna know about
         ++$text_bits;
         $data = substr($track_chunk, 2 + length($2), $length );
         # skip the FF, the command, and the length bytes
         # If you want to clean up $data (e.g., kill control codes), do it here.
         print "$text_bits\:$type\: $data\n";
       }
       substr($track_chunk, 0, 2 + length($2) + $length ) = ''; # slice it out

     } elsif($command == 0xF0 || $command == 0xF7) { # It's a sysex.  Ugh.
       next Track_Chunk
          unless $track_chunk =~ /^([\xF0\xF7])([\x80-\xFF]*[\x00-\x7F])/;
       substr($track_chunk, 0, 1 + length($2) + &read_variable_length($2) ) = '';

     # 0xF2 and 0xF3 are the only remaining F-series statuses that have
     #  data bytes following 'em
     } elsif($command == 0xF3) { # It's a Song Position
       substr($track_chunk, 0, 3 ) = ''; # itself, and 2 data bytes
     } elsif($command == 0xF3) { # It's a Song Select
       substr($track_chunk, 0, 2 ) = ''; # itself, and 1 data byte
     } else { # fall thru: for other F-series statuses, or unparsable garbage
       substr($track_chunk, 0, 1) = ''; # best I can think of to do
     }
   }
}
exit;

###########################################################################

sub read_variable_length {
  local($byte, $value, @bytes) = ('',0);

  return 0 unless length($_[0]);
  # not that we should ever be fed a null string anyway

  return 0 unless $_[0] =~ /^([\x80-\xFF]*[\x00-\x7F])/;
  @bytes = unpack('C*', $1);
  while(@bytes) {
    $byte = shift @bytes;
    $value = ($value << 7) | ($byte & 0x7f);
    return $value >> 7 if $value > 0xFFF_FFFF; # shouldn't ever happen
    last unless $byte & 0x80; # a clear 7th bit ends the encoding
  }

  return $value;
}

###########################################################################
# end

