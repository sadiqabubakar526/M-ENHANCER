import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import ArtistTab from './ArtistTab/ArtistTab';
import AlbumTab from './AlbumTab/AlbumTab';
import ArtistWithSongList from './ArtistTab/ArtistWithSongList';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '100vh',
  },
}));

const YourLib = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [artistIdState, setArtistIdState] = useState('');
  const [songListAccordingToArtist, setSongListAccordingToArtist] = useState(
    false
  );
  const yourLibCardClickHandler = (data) => {
    setSongListAccordingToArtist(true);
    setArtistIdState(data);
  };

  return !songListAccordingToArtist ? (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='secondary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Artists' {...a11yProps(0)} />
          <Tab label='Albums' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabview}>
        <ArtistTab yourLibCardClickHandler={yourLibCardClickHandler} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabview}>
        <AlbumTab />
      </TabPanel>
    </div>
  ) : (
    <ArtistWithSongList artistId={artistIdState} />
  );
};

export default YourLib;
