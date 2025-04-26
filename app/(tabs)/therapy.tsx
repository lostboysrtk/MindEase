import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/Theme';
import { Search, BookMarked, Brain, Wind, Heart, Moon, CirclePlay as PlayCircle, Clock } from 'lucide-react-native';

interface CategoryItem {
  id: string;
  title: string;
  icon: JSX.Element;
}

interface MeditationItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  favorite: boolean;
}

export default function TherapyScreen() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories: CategoryItem[] = [
    {
      id: 'all',
      title: 'All',
      icon: <BookMarked size={24} color={theme.colors.neutral[800]} />,
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      icon: <Brain size={24} color={theme.colors.neutral[800]} />,
    },
    {
      id: 'breathing',
      title: 'Breathing',
      icon: <Wind size={24} color={theme.colors.neutral[800]} />,
    },
    {
      id: 'selfcare',
      title: 'Self Care',
      icon: <Heart size={24} color={theme.colors.neutral[800]} />,
    },
    {
      id: 'sleep',
      title: 'Sleep',
      icon: <Moon size={24} color={theme.colors.neutral[800]} />,
    },
  ];

  const featuredMeditations: MeditationItem[] = [
    {
      id: '1',
      title: 'Morning Calm',
      category: 'mindfulness',
      duration: '10 min',
      image:
        'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: true,
    },
    {
      id: '2',
      title: 'Anxiety Relief',
      category: 'breathing',
      duration: '5 min',
      image:
        'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: false,
    },
    {
      id: '3',
      title: 'Deep Sleep',
      category: 'sleep',
      duration: '20 min',
      image:
        'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: false,
    },
  ];

  const allMeditations: MeditationItem[] = [
    ...featuredMeditations,
    {
      id: '4',
      title: 'Loving Kindness',
      category: 'selfcare',
      duration: '15 min',
      image:
        'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: true,
    },
    {
      id: '5',
      title: 'Body Scan',
      category: 'mindfulness',
      duration: '12 min',
      image:
        'https://images.pexels.com/photos/4473398/pexels-photo-4473398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: false,
    },
    {
      id: '6',
      title: 'Stress Relief',
      category: 'breathing',
      duration: '8 min',
      image:
        'https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: false,
    },
    {
      id: '7',
      title: 'Focus & Productivity',
      category: 'mindfulness',
      duration: '10 min',
      image:
        'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: false,
    },
    {
      id: '8',
      title: 'Evening Wind Down',
      category: 'sleep',
      duration: '15 min',
      image:
        'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      favorite: true,
    },
  ];

  const filteredMeditations = activeCategory === 'all'
    ? allMeditations
    : allMeditations.filter(item => item.category === activeCategory);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Therapy & Mindfulness</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={theme.colors.neutral[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categorySection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  activeCategory === item.id && styles.activeCategoryItem,
                ]}
                onPress={() => setActiveCategory(item.id)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    activeCategory === item.id && styles.activeCategoryIcon,
                  ]}
                >
                  {item.icon}
                </View>
                <Text
                  style={[
                    styles.categoryTitle,
                    activeCategory === item.id && styles.activeCategoryTitle,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredMeditations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.featuredImage}
                />
                <View style={styles.playButton}>
                  <PlayCircle size={48} color="#fff" />
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <View style={styles.featuredMeta}>
                    <Clock size={14} color={theme.colors.neutral[400]} />
                    <Text style={styles.featuredDuration}>{item.duration}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.guidedTherapySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Guided Sessions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridContainer}>
            {filteredMeditations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
                <View style={styles.gridPlayButton}>
                  <PlayCircle size={36} color="#fff" />
                </View>
                <View style={styles.gridInfo}>
                  <Text style={styles.gridTitle}>{item.title}</Text>
                  <Text style={styles.gridDuration}>{item.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.themeSection}>
          <Text style={styles.sectionTitle}>Therapy Themes</Text>
          <View style={styles.themeCards}>
            <TouchableOpacity style={[styles.themeCard, { backgroundColor: theme.colors.primary[50] }]}>
              <Brain size={24} color={theme.colors.primary[600]} />
              <Text style={styles.themeTitle}>Anxiety</Text>
              <Text style={styles.themeCount}>8 sessions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.themeCard, { backgroundColor: theme.colors.secondary[50] }]}>
              <Heart size={24} color={theme.colors.secondary[600]} />
              <Text style={styles.themeTitle}>Depression</Text>
              <Text style={styles.themeCount}>10 sessions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.themeCard, { backgroundColor: theme.colors.accent[50] }]}>
              <Moon size={24} color={theme.colors.accent[600]} />
              <Text style={styles.themeTitle}>Sleep</Text>
              <Text style={styles.themeCount}>6 sessions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.themeCard, { backgroundColor: theme.colors.success[50] }]}>
              <Wind size={24} color={theme.colors.success[600]} />
              <Text style={styles.themeTitle}>Stress</Text>
              <Text style={styles.themeCount}>12 sessions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.neutral[800],
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  categorySection: {
    marginVertical: theme.spacing.md,
  },
  categoryList: {
    paddingHorizontal: theme.spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    opacity: 0.7,
  },
  activeCategoryItem: {
    opacity: 1,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  activeCategoryIcon: {
    backgroundColor: theme.colors.primary[100],
  },
  categoryTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[700],
  },
  activeCategoryTitle: {
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  featuredSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  featuredList: {
    paddingHorizontal: theme.spacing.lg,
  },
  featuredItem: {
    width: 280,
    height: 160,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  featuredTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: '#fff',
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredDuration: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[200],
    marginLeft: 4,
  },
  guidedTherapySection: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  seeAllText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
  },
  gridItem: {
    width: '48%',
    height: 160,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    marginRight: '4%',
  },
  gridItem: {
    width: '48%',
    height: 160,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  gridItem: {
    width: '48%',
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    marginRight: '4%',
  },
  gridItem: {
    position: 'relative',
    width: '48%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    marginLeft: '1%',
    marginRight: '1%',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gridPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -18 }, { translateY: -18 }],
  },
  gridInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  gridTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: '#fff',
  },
  gridDuration: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.neutral[200],
  },
  themeSection: {
    marginBottom: theme.spacing.lg,
  },
  themeCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '48%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  themeTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginVertical: theme.spacing.sm,
  },
  themeCount: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
  },
});