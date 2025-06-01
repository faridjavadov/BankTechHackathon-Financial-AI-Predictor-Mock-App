import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    padding: {
        small: 8,
        medium: 16,
        large: 24,
    },
    borderRadius: {
        small: 4,
        medium: 8,
        large: 16,
    },
    fontSize: {
        small: 12,
        medium: 14,
        large: 16,
        xlarge: 18,
        xxlarge: 24,
    }
};