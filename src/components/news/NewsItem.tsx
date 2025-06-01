// src/components/news/EnhancedNewsItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NewsArticle } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import Colors from '../../constants/colors';

interface EnhancedNewsItemProps {
  article: NewsArticle;
  onPress: () => void;
}

const NewsItem: React.FC<EnhancedNewsItemProps> = ({ article, onPress }) => {
  const getImpactColor = () => {
    switch (article.impactLevel) {
      case 'high': return Colors.danger;
      case 'medium': return Colors.warning;
      case 'low': return Colors.success;
      default: return Colors.primary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.sourceContainer}>
            <Image source={{ uri: article.source.logoUrl }} style={styles.sourceLogo} />
            <Text style={styles.sourceName}>{article.source.name}</Text>
          </View>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        
        <View style={styles.tagsContainer}>
          <View style={[styles.impactTag, { backgroundColor: `${getImpactColor()}15` }]}>
            <Text style={[styles.impactText, { color: getImpactColor() }]}>
              {article.impactLevel.toUpperCase()}
            </Text>
          </View>
          
          {article.relatedAssets.slice(0, 2).map((asset, index) => (
            <View key={index} style={styles.assetTag}>
              <Text style={styles.assetText}>{asset}</Text>
            </View>
          ))}
          
          {article.relatedAssets.length > 2 && (
            <View style={styles.moreTag}>
              <Text style={styles.moreText}>+{article.relatedAssets.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
      
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceLogo: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
  },
  sourceName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  impactTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  assetTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  assetText: {
    fontSize: 10,
    color: Colors.text,
  },
  moreTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  moreText: {
    fontSize: 10,
    color: Colors.textLight,
  },
  image: {
    width: 100,
    height: '100%',
  },
});

export default NewsItem;