import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Share, 
  Linking 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { newsArticles } from '../data/mockNews';
import { formatDate } from '../utils/dateFormatter';
import Colors from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

const NewsDetailScreen: React.FC = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const { id } = route.params;
  const [article, setArticle] = useState(newsArticles[0]);

  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = newsArticles.find(item => item.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, [id]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title} - ${article.url}`,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const handleOpenSource = () => {
    if (article.url) {
      Linking.openURL(article.url).catch(err => console.error('Could not open URL:', err));
    }
  };

  const getImpactColor = () => {
    switch (article.impactLevel) {
      case 'high': return Colors.impact.high;
      case 'medium': return Colors.impact.medium;
      case 'low': return Colors.impact.low;
      default: return Colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{article.title}</Text>
            
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Ionicons name="share-outline" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.sourceInfo}>
            <View style={styles.sourceContainer}>
              <Image source={{ uri: article.source.logoUrl }} style={styles.sourceLogo} />
              <Text style={styles.sourceName}>{article.source.name}</Text>
            </View>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            <View style={[styles.impactTag, { backgroundColor: `${getImpactColor()}15` }]}>
              <Text style={[styles.impactText, { color: getImpactColor() }]}>
                {article.impactLevel.toUpperCase()} IMPACT
              </Text>
            </View>
            
            {article.relatedAssets.map((asset, index) => (
              <View key={index} style={styles.assetTag}>
                <Text style={styles.assetText}>{asset}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.summary}>{article.summary}</Text>
          
          <Text style={styles.content}>{article.content}</Text>
          
          <TouchableOpacity style={styles.sourceButton} onPress={handleOpenSource}>
            <Text style={styles.sourceButtonText}>Read Full Article on {article.source.name}</Text>
            <Ionicons name="open-outline" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    lineHeight: 28,
    marginRight: 12,
  },
  shareButton: {
    padding: 8,
  },
  sourceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  sourceName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  date: {
    fontSize: 14,
    color: Colors.textLight,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  impactTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  assetTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  assetText: {
    fontSize: 12,
    color: Colors.text,
  },
  summary: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}10`,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  sourceButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default NewsDetailScreen;