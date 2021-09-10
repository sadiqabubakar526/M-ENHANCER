import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

const MusicPlayer = ({
  musicInfoQuery = 0,
  getRecentPlayQuery = 0,
  getSongByIdQuery = 0,
  songIdForBrowseTab = 0,
  songIdForRecentPlayedTab = 0,
  songIdForYourLibArtistTab = 0,
  songInfoForYourLibArtist = 0,
  getLikedSongs = 0,
  songIdForLikedSongTab = 0,
  getPlayList = 0,
  songIdForgetPlayListSongTab = 0,
  as,
}) => {
  // const [autoPlay, setAutoPlay] = React.useState(false);
  let index, audioList;
  switch (as) {
    case 'Home':
      {
        index = musicInfoQuery.getAllSongs.findIndex((oneSong, index) => {
          if (String(oneSong._id) === getSongByIdQuery.getSongById._id) {
            return index;
          }
        });
        audioList = musicInfoQuery.getAllSongs;
      }
      break;
    case 'Browse':
      {
        index = musicInfoQuery.getAllSongs.findIndex((oneSong, index) => {
          if (String(oneSong._id) === songIdForBrowseTab) return index;
        });
        audioList = musicInfoQuery.getAllSongs;
      }
      break;
    case 'Moody':
      {
        index = musicInfoQuery.getAllSongs.findIndex((oneSong, index) => {
          if (String(oneSong._id) === songIdForgetPlayListSongTab) return index;
        });
        audioList = musicInfoQuery.getPlayList;
      }
      break;
    case 'Recent Played':
      {
        index = getRecentPlayQuery.getRecentPlay.findIndex((oneSong, index) => {
          if (String(oneSong._id) === songIdForRecentPlayedTab) return index;
        });
        audioList = getRecentPlayQuery.getRecentPlay;
      }
      break;
    case 'YourLibArtist':
      {
        index = songInfoForYourLibArtist.getSongsByArtist.findIndex(
          (oneSong, index) => {
            if (String(oneSong._id) === songIdForYourLibArtistTab) return index;
          }
        );
        audioList = songInfoForYourLibArtist.getSongsByArtist;
      }
      break;
    case 'Liked Songs':
      {
        index = getLikedSongs.getLikeSongs.findIndex((oneSong, index) => {
          if (String(oneSong._id) === songIdForLikedSongTab) return index;
        });
        audioList = getLikedSongs.getLikeSongs;
      }
      break;
    default:
      index = 0;
  }

  React.useEffect(() => {
    const musicPlayerAudio = document.getElementsByClassName(
      'music-player-audio'
    )[0];
    musicPlayerAudio.setAttribute('muted', 'muted');
  }, []);
  // if not any id match then play 0 index song
  if (index === -1) {
    index = 0;
  }
  return (
    <>
      <ReactJkMusicPlayer
        audioLists={audioList}
        autoPlay={true}
        showPlayMode={false}
        mode='full'
        showDestroy={false}
        showDownload={false}
        playIndex={index}
        // onAudioEnded={(end) => console.log("audio ended", end)}
      />
    </>
  );
};

export default MusicPlayer;
