import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../utils';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Light,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,

    shadowColor: Colors.GREY,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  songContent: {
    textAlign: 'center',
    color: Colors.Red,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '200',
    marginTop: 2,
  },
  progressBar: {
    flexDirection: 'row',
    width: 350,
    height: 40,
    marginTop: 20,
  },
  progressDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  progressText: {
    color: Colors.Red,
    fontWeight: '500',
  },
  musicControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
});

export default styles;
