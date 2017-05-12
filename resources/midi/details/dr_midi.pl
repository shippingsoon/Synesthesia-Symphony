#!/usr/bin/perl
# Daktari MIDI, a Midi file dumper.  Version 1m
# Time-stamp: "1998-06-15 19:20:51 MDT sburke@alf8.speech.cs.cmu.edu"
#
# This program contains documentation in HTML format.  To view this
# code, either copy it out of the bottom of this file, or call this
# program like this:
#   dr_midi.pl -dumphtml > drmidi.html
#
######################################################################
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
######################################################################
# Bugs and revision history:
# 1997-11-16: first release.  Works fine on any file I run it on, but
#             the proverbial devil may be in the details.
# 1998-06-15: first real mod.  v.1n
#             Fixed an obscure bug.  Others are to be fixed later.
#             Next rewrite is a big one.
### Report bugs to me, sburke@netadventure.net #######################
#
# Musings:
#  Should I even try to handle key changes, and controller names?
#  Apparently one can't translate note-numbers (e.g., 69) to note
#  names ("A5") without handling key information.  Or can one?
######################################################################
require 5.004;

$debug = 0;
$show_hex = 0; # whether or not to show hex.

%surpress_event_listing = ( # comment out what you DO want to see
# 0x80, 1, #Note off
# 0x90, 1, #Note on
# 0xA0, 1, #Key after-touch
 0xB0, 0, #Control change
 0xC0, 0, #Program (patch) change
 0xD0, 0, #Channel after-touch
 0xE0, 0, #Pitch wheel change
);

###########################################################################
#Data tables follow

%meta_event_types = (
 0x00, "Set sequence number",
 0x01, "Text event",
 0x02, "Copyright text event",
 0x03, "Track name",
 0x04, "Instrument name",
 0x05, "Lyric",
 0x06, "Marker",
 0x07, "Cue point",
 0x2F, "End-track event",
 0x51, "Set tempo",
 0x58, "Time signature",
 0x59, "Key signature",
 0x7F, "Seq-specific information",
);  

%event_types = (
 0x80, "Note off",
 0x90, "Note on",
 0xA0, "Key after-touch",
 0xB0, "Control change",
 0xC0, "Program (patch) change",
 0xD0, "Channel after-touch",
 0xE0, "Pitch wheel change",
);

@patch_names = (   # from the General Midi map.

# 0 
"Acoustic Grand",   # PIANO
"Bright Acoustic",
"Electric Grand",
"Honky-Tonk",
"Electric Piano 1",
"Electric Piano 2",
"Harpsichord",
"Clav",
"Celesta",          # CHROM PERCUSSION
"Glockenspiel",
"Music Box",
"Vibraphone",
"Marimba",
"Xylophone",
"Tubular Bells",
"Dulcimer",

# 16
"Drawbar Organ",  # ORGAN
"Percussive Organ",
"Rock Organ",
"Church Organ",
"Reed Organ",
"Accoridan",
"Harmonica",
"Tango Accordian",
"Acoustic Guitar(nylon)", # GUITAR
"Acoustic Guitar(steel)",
"Electric Guitar(jazz)",
"Electric Guitar(clean)",
"Electric Guitar(muted)",
"Overdriven Guitar",
"Distortion Guitar",
"Guitar Harmonics",

#32
"Acoustic Bass",  # BASS
"Electric Bass(finger)",
"Electric Bass(pick)",
"Fretless Bass",
"Slap Bass 1",
"Slap Bass 2",
"Synth Bass 1",
"Synth Bass 2",
"Violin",  # STRINGS
"Viola",
"Cello",
"Contrabass",
"Tremolo Strings",
"Orchestral Strings",
"Orchestral Strings",
"Timpani",

#48
"String Ensemble 1", # ENSEMBLE
"String Ensemble 2",
"SynthStrings 1",
"SynthStrings 2",
"Choir Aahs",
"Voice Oohs",
"Synth Voice",
"Orchestra Hit",
"Trumpet",    # BRASS
"Trombone",
"Tuba",
"Muted Trumpet",
"French Horn",
"Brass Section",
"SynthBrass 1",
"SynthBrass 2",

#64
"Soprano Sax",  # REED
"Alto Sax",
"Tenor Sax",
"Baritone Sax",
"Oboe",
"English Horn",
"Bassoon",
"Clarinet",
"Piccolo",  # PIPE
"Flute",
"Recorder",
"Pan Flute",
"Blown Bottle",
"Skakuhachi",
"Whistle",
"Ocarina",

#80
"Lead 1 (square)",  # SYNTH LEAD
"Lead 2 (sawtooth)",
"Lead 3 (calliope)",
"Lead 4 (chiff)",
"Lead 5 (charang)",
"Lead 6 (voice)",
"Lead 7 (fifths)",
"Lead 8 (bass+lead)",
"Pad 1 (new age)",  # SYNTH PAD
"Pad 2 (warm)",
"Pad 3 (polysynth)",
"Pad 4 (choir)",
"Pad 5 (bowed)",
"Pad 6 (metallic)",
"Pad 7 (halo)",
"Pad 8 (sweep)",

#96
"FX 1 (rain)",   # SYNTH EFFECTS
"FX 2 (soundtrack)",
"FX 3 (crystal)",
"FX 4 (atmosphere)",
"FX 5 (brightness)",
"FX 6 (goblins)",
"FX 7 (echoes)",
"FX 8 (sci-fi)",
"Sitar",    # ETHNIC
"Banjo",
"Shamisen",
"Koto",
"Kalimba",
"Bagpipe",
"Fiddle",
"Shanai",

#112
"Tinkle Bell",  # PERCUSSIVE
"Agogo",
"Steel Drums",
"Woodblock",
"Taiko Drum",
"Melodic Tom",
"Synth Drum",
"Reverse Cymbal",
"Guitar Fret Noise", # SOUND EFFECTS
"Breath Noise",
"Seashore",
"Bird Tweet",
"Telephone Ring",
"Helicopter",
"Applause",
"Gunshot",
);

###########################################################################
# Note number 69 reportedly == A440
#
# Octv||                            Note Numbers
#  #  || Do          Re          Mi    Fa          So          La          Ti
#     || C   | C#  | D   | D#  | E   | F   | F#  | G   | G#  | A   | A#  | B
#-----------------------------------------------------------------------------
#  0  ||   0 |   1 |   2 |   3 |   4 |   5 |   6 |   7 |   8 |   9 |  10 | 11
#  1  ||  12 |  13 |  14 |  15 |  16 |  17 |  18 |  19 |  20 |  21 |  22 | 23
#  2  ||  24 |  25 |  26 |  27 |  28 |  29 |  30 |  31 |  32 |  33 |  34 | 35
#  3  ||  36 |  37 |  38 |  39 |  40 |  41 |  42 |  43 |  44 |  45 |  46 | 47
#  4  ||  48 |  49 |  50 |  51 |  52 |  53 |  54 |  55 |  56 |  57 |  58 | 59
#  5  ||  60 |  61 |  62 |  63 |  64 |  65 |  66 |  67 |  68 |  69 |  70 | 71
#  6  ||  72 |  73 |  74 |  75 |  76 |  77 |  78 |  79 |  80 |  81 |  82 | 83
#  7  ||  84 |  85 |  86 |  87 |  88 |  89 |  90 |  91 |  92 |  93 |  94 | 95
#  8  ||  96 |  97 |  98 |  99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107
#  9  || 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119
# 10  || 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 |
###########################################################################

die "No arguments\n" unless @ARGV;

if (@ARGV == 1 && $ARGV[0] eq '-dumphtml') {
  print while(<DATA>);
  exit;
}



die "Can't open $ARGV[0] \: $!\n"  unless open(MIDI, "<$ARGV[0]");
binmode(MIDI);
print "File: $ARGV[0]\n";

die "can't read header" unless read(MIDI, $in, 14); # the header length

($id, $length, $format, $tracks, $ticks) = unpack('A4Nnnn', $in);

die "Almost definitely not a MIDI file\n" unless $id eq 'MThd';
print "Unexpected header length ($length)!\n" unless $length == 6;

printf "Format: %d\nTracks: %d\nTicks per quarter note: %d\n",
       $format, $tracks, $ticks;

Track_Chunk:
until(eof(MIDI)) {
   $sum_t = 0;
   read(MIDI, $track_header, 8) || die "Can't read track header\n";

   ($id, $length) = unpack('A4N', $track_header);
   print "\nTrack chunk of $length bytes\n"; #!#
   read(MIDI, $track_chunk, $length);
   unless($id eq 'MTrk') {
     print " Unknown track-chunk type $id of length $length\n";
     next Track_Chunk; # leave this track unanalyzed
   }

   print "Track chunk is short by ", ($length - length($track_chunk)), " bytes\n"
      if $length != length($track_chunk);

  Event: # analyze the event stream
    while(length($track_chunk)){ # while there's anything to analyze
     # <MTrk event> = <delta-time> <event>
     # <event> = <midi event | sysex event | meta-event>

     $event = '';

     # Slice off the delta time code, and analyze it
     if( $track_chunk =~ s/^([\x80-\xFF]*[\x00-\x7F])// ) {
       $time_code = $1; # This is a valid time-code.
       $event .= $1;
     } else { # didn't get sliced off; must be bad
       print " Bad track-chunk data format.  No time code found.\n";
       next Track_Chunk;
     }
     $time = &read_variable_length($time_code);
     $sum_t += $time;
     $formatted_time = sprintf("%06st\: ", $time);

     #######################
     # Now let's see what we can make of the command
     $first_byte = ord(substr($track_chunk,0,1));

     if ($first_byte < 0xF0) { # a MIDI event #######################
       if($track_chunk =~ s/^([\x80-\xEF])// ) {
         $last_event_code = $event_code = $1;
         $event .= $1;
       } else { # it's a running status mofo.
         $event_code = $last_event_code;
       }
       $command = ord($event_code) & 0xF0;

       if ($command == 0xC0 || $command == 0xD0) { # pull off the 1-byte argument
         $parameter = substr($track_chunk, 0, 1);
         substr($track_chunk, 0, 1) = '';
       } else { # pull off the 2-byte argument
         $parameter = substr($track_chunk, 0, 2);
         substr($track_chunk, 0, 2) = '';
       }
       next Event if $surpress_event_listing{$command};

       $channel = ord($event_code) & 0x0F;
       $event .= $parameter;
       print "$formatted_time $event_types{$command} ::  Channel $channel.  ";

       if ($command == 0x80 || $command == 0x90 || $command == 0xA0 ) {
         printf "Note %d\.  Velocity %d\n", unpack('C2', $parameter);
       } elsif ($command == 0xB0) {
         printf "Controller %d\.  Value: %d\n", unpack("C2", $parameter);
       } elsif ($command == 0xC0) {
         $patch = unpack ("C", $parameter);
         print "Patch $patch (",
              ($patch_names[$patch] || '?'),
              ")\n";
       } elsif ($command == 0xD0) {
         printf "Channel %d\.\n", unpack("C", $parameter);
       } elsif ($command == 0xE0) {
         printf " %d\n", (unpack("V2", $parameter) - 0x2000);
	 # Wait, that's not right at all.  To be fixed.
       } else {
         print "SPORK ERROR 10\n";
       }

       &hex_dump($event) if $show_hex;

     } elsif($first_byte == 0xFF) { # It's a meta-event! ############
       unless($track_chunk =~ /^\xFF(.)([\x80-\xFF]*[\x00-\x7F])/) {
         print "$formatted_time Meta-event format error\n";
         next Track_Chunk;
       }
       $command = $1;
       $length = $2;
       print "$formatted_time Meta-event type \$", unpack("H2", $command),
             ' (', ($meta_event_types{ord($command)} || '?'),
             ') of length ', &read_variable_length($length), "\n";
       $data = substr($track_chunk,
               2 + length($length), # skip the FF, the command, and the length bytes
               &read_variable_length($length) ); # the length of the data
       # now slice it out
       substr($track_chunk, 0,
              2 + length($length) + length($data) ) = '';

       if ($show_hex) {
         &hex_dump($data);
       } else {
         &text_dump($data);
       }

     } elsif($first_byte == 0xF0   # It's a SYSEX ###################
         || $first_byte == 0xF7) {
       # Note that sysexes in MIDI /files/ are different than sysexes in
       #  MIDI transmissions!!
       # <<The vast majority of system exclusive messages will just use the F0 
       #  format. For instance, the transmitted message F0 43 12 00 07 F7 would
       #  be stored in a MIDI file as F0 05 43 12 00 07 F7. As mentioned above,
       #  it is required to include the F7 at the end so that the reader of the
       #  MIDI file knows that it has read the entire message.>>
       # (But the F7 is omitted if this is a non-final block in a multiblock
       #  sysex; but the F7 (if there) is counted in the message's declared
       #  length, so we don't have to think about it anyway.)

       unless($track_chunk =~ /^([\xF0\xF7])([\x80-\xFF]*[\x00-\x7F])/) {
         print "$formatted_time Sysex format error\n";
         next Track_Chunk;
       }
       $command = $1;
       $length = $2;
       print "$formatted_time Sysex type ", unpack("H2", $command),
             ' of length ', &read_variable_length($length), "\n";
       $data = substr($track_chunk,
               1 + length($length), # skip the F7/F0 and the length bytes
               &read_variable_length($length) ); # the length of the data
       # now slice it out
       substr($track_chunk, 0,
              1 + length($length) + length($data) ) = '';

       &hex_dump($data) if $show_hex;

     # Handle other f-series statuses here

     } elsif($command == 0xF2) { # It's a Song Position #############
       print "$formatted_time Song Position (F2).\n";
       &hex_dump(substr($track_chunk, 1, 2)) if $show_hex;
       substr($track_chunk, 0, 3 ) = ''; # itself, and 2 data bytes

     } elsif($command == 0xF3) { # It's a Song Select ###############
       print "$formatted_time Song Select (F3).\n";
       &hex_dump(substr($track_chunk, 1, 1)) if $show_hex;
       substr($track_chunk, 0, 2 ) = ''; # itself, and 1 data byte

     } elsif($command == 0xF6) { # It's a Tune Request! #############
       print "$formatted_time Tune Request (F6) [!!].\n";
       # what the sam scratch would a tune request be doing in a MIDI /file/?
       substr($track_chunk, 0, 1 ) = ''; # itself

     } else { # fall thru
       if($track_chunk =~ s/^([\x00-\x7F]+)//) {
         if ($1 eq "\x00") {
           print "$formatted_time   skipping a null\n";
         } else {
           print "$formatted_time  Skipping strange data of length ", length($1), "\n";
         }
       } else {
         print "$formatted_time  Unanalyzable data of length ", length($track_chunk), "\n";
         &hex_dump($track_chunk);
         last Event;
       }
     }
  }
} continue {
  print "Sigma t = ", $sum_t, "\n";
}

print "End.\n";
exit;

###########################################################################
sub hex_dump {
  local($in_data, $chonk, $hex, $char) = ($_[0] , '', '', '');
  while(length($in_data)) {
    $chonk = substr($in_data, 0, 16);
    substr($in_data, 0, 16) = '';
    $char = $chonk;
    $char =~ tr/[\x00-\x1F\x7F-\xA0]/_/;
    $hex = unpack('H*', $chonk);
    $hex =~ s/(..)/$1 /g;
    printf "\t  %-48s\: %s\n", $hex, $char;
  }
  return;
}

sub text_dump {
  local($in_data, $char) = ($_[0] , '');
  while(length($in_data)) {
    $char = substr($in_data, 0, 32);
    substr($in_data, 0, 32) = '';
    $char =~ tr/[\x00-\x1F\x7F-\xA0]/_/;
    printf "\t  $char\n";
  }
  return;
}

###########################################################################

sub read_variable_length {
  local($byte, $value, @bytes) = ('',0);

  return 0 unless length($_[0]);
  # not that we should ever be fed a null string anyway

  if($_[0] =~ /^([\x80-\xFF]*[\x00-\x7F])/) {
    @bytes = unpack('C*', $1);
  } else {
    print "bad VL format error\n";
    return 0;
  }

  while(@bytes) {
    $byte = shift @bytes;
    #!# print "Byte read: $byte\n";
    $value = ($value << 7) | ($byte & 0x7f);

    if ($value > 0xFFF_FFFF) { # shouldn't ever happen
      print "variable-length value goes out of range\n";
      return $value >> 7; # some attempt at rectification
    }

    last unless $byte & 0x80; # a clear 7th bit ends the encoding
  }

  return $value;
}

###########################################################################
# The end of the script as we know it.
__END__
<HTML><HEAD>
<LINK REV=made HREF="mailto:sburke@cpan.org">
<META HTTP-EQUIV="Content-Language" content="en-US">
<META HTTP-EQUIV="Keywords" content="MIDI, debug, dump">
<BASE HREF="http://www.lenzo.com/~sburke/pub/">
<title>Daktari MIDI -- a MIDI file dumper</title>
</head><body>

<H1>Daktari MIDI -- a MIDI file dumper</H1>

<H2>Description</H2>
Daktari MIDI is a perl script that takes a MIDI file as input
and gives an elaborate annotated dump of the file's contents.
Track names, note events, controller settings, etc., are all
included.  Read the source for the gory details.

<P>If you want to extract just the text events from MIDI files (say, for
archival purposes), get <A HREF="midi_text21.pl">my simpler and
quicker MIDI text dumper</A>.

<H2>Known Problems</H2>
<UL>
<LI>Vagarities of the file-format kept me from making some of the analysis
   optimally helpful.  E.g., the program reports "note 69" without telling
   you what note (A5, usually) that corresponds to;  this is because
   the real note-number to note-name correspondence would require me tracking
   key-change meta-events which I don't know how to do.
   The case with controller names is similar.
<LI><CODE>sub read_variable_length</CODE> could really use rewriting
to use new <CODE>unpack</CODE> options for improved efficiency.
</UL>

<H2>Usage</H2>
From the command line, where you'll have renamed this perl script to something
like <CODE>drmidi</CODE>, and <CODE>chmod a+rx</CODE>'d it, and where you
are analyzing a file named <CODE>chimes.mid</CODE>, for example:
<BLOCKQUOTE>
<CODE>drmidi chimes.mid</CODE>
</BLOCKQUOTE>
On a Mac (hence no command line), open the .pl file in MacPerl and save
it as a droplet.   From then on you can drop MIDI files onto it.  Note that
the output might be so long as to overflow the MacPerl's output window's
scrollback buffer.
My guess is that if you add this:
<BLOCKQUOTE>
<CODE>die "Can't divert STDOUT" unless open(STDOUT, "&gt;stdout.txt");</CODE>
</BLOCKQUOTE>
as the second line of the perl script, it'll magically divert the output to
stdout.txt.  Good luck.

<H2>Availability &amp; Distribution</H2>
Get your copy of the latest release here:

<UL>
<LI><A HREF="dr_midi.pl"><CODE>dr_midi.pl</CODE></A> --
 about 18 K.
</UL>

<P>This program is released under the GNU Public License:

<P>This program is free software; you can
redistribute it and/or modify it under the terms of the GNU General
Public License as published by the Free Software Foundation; either
version 2, or (at your option) any later version.

<P>This program is distributed in the hope that it
will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See
the GNU General Public License for more details.

<P>To see a copy of the GNU General Public License, see
<A HREF="http://www.ling.nwu.edu/~sburke/gnu_release.html">http://www.ling.nwu.edu/~sburke/gnu_release.html</A>
or write to the
Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

<FOOTER><HR><FONT SIZE="+1"><A HREF="/~sburke/"><IMG
 SRC="/~sburke/images/hy50x50.gif" HEIGHT=50 WIDTH=50
 ALIGN=center ALT="[Home] ">Sean M. Burke</a></font>
<CODE>&lt;<A HREF="/~sburke/mail-me.html">sburke@netadventure.net</A>&gt;</CODE>,
1998-03-08
</FOOTER></BODY></HTML>
