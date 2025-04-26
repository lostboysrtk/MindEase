import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/Theme';
import {
  Brain,
  Wind,
  Heart,
  Moon,
  Music,
  Bell,
  Sun,
  Settings,
  TrendingUp,
  Calendar,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { width } = useWindowDimensions();
  const cardWidth = (width - theme.spacing.lg * 3) / 2;

  const quickActions = [
    {
      title: 'Meditation',
      description: '10 min session',
      icon: <Brain size={24} color={isDarkMode ? '#fff' : theme.colors.primary[600]} />,
      gradient: ['#FFE5F1', '#FFD1E8'],
      darkGradient: ['#2A1F2D', '#1F1720'],
    },
    {
      title: 'Breathing',
      description: '5 min exercise',
      icon: <Wind size={24} color={isDarkMode ? '#fff' : theme.colors.secondary[600]} />,
      gradient: ['#E5F4FF', '#D1EBFF'],
      darkGradient: ['#1F2A2D', '#172022'],
    },
    {
      title: 'Sleep',
      description: 'Bedtime routine',
      icon: <Moon size={24} color={isDarkMode ? '#fff' : theme.colors.accent[600]} />,
      gradient: ['#F4E5FF', '#EBD1FF'],
      darkGradient: ['#2A1F2D', '#201720'],
    },
    {
      title: 'Relaxation',
      description: 'Calming sounds',
      icon: <Music size={24} color={isDarkMode ? '#fff' : theme.colors.success[600]} />,
      gradient: ['#E5FFF4', '#D1FFE9'],
      darkGradient: ['#1F2D2A', '#172220'],
    },
  ];

  const todayStats = [
    {
      title: 'Mood Score',
      value: 85,
      icon: <Heart size={20} color={theme.colors.primary[500]} />,
    },
    {
      title: 'Mindful Minutes',
      value: 45,
      icon: <Brain size={20} color={theme.colors.secondary[500]} />,
    },
    {
      title: 'Streak Days',
      value: 7,
      icon: <TrendingUp size={20} color={theme.colors.success[500]} />,
    },
  ];

  const upcomingSession = {
    title: 'Evening Meditation',
    time: '8:00 PM',
    duration: '15 min',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <LinearGradient
        colors={
          isDarkMode
            ? ['#121212', '#1a1a1a', '#202020']
            : [theme.colors.primary[50], theme.colors.secondary[50], '#ffffff']
        }
        style={styles.background}
      />

      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, isDarkMode && styles.darkText]}>Good morning,</Text>
          <Text style={[styles.userName, isDarkMode && styles.darkText]}>Sarah</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={isDarkMode ? '#fff' : theme.colors.neutral[700]} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun size={24} color="#fff" />
            ) : (
              <Moon size={24} color={theme.colors.neutral[700]} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          {todayStats.map((stat, index) => (
            <View 
              key={index} 
              style={[
                styles.statCard,
                isDarkMode && styles.darkStatCard
              ]}
            >
              <View style={styles.statHeader}>
                {stat.icon}
                <Text style={[styles.statTitle, isDarkMode && styles.darkText]}>
                  {stat.title}
                </Text>
              </View>
              <Text style={[styles.statValue, isDarkMode && styles.darkText]}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.upcomingContainer}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Next Session
          </Text>
          <TouchableOpacity style={[styles.sessionCard, isDarkMode && styles.darkSessionCard]}>
            <Image source={{ uri: upcomingSession.image }} style={styles.sessionImage} />
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
              style={styles.sessionGradient}
            >
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>{upcomingSession.title}</Text>
                <View style={styles.sessionMeta}>
                  <Calendar size={16} color="#fff" />
                  <Text style={styles.sessionTime}>
                    {upcomingSession.time} • {upcomingSession.duration}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
          Quick Actions
        </Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.actionCard,
                { width: cardWidth }
              ]}
            >
              <LinearGradient
                colors={isDarkMode ? action.darkGradient : action.gradient}
                style={styles.actionGradient}
              >
                <View style={[styles.actionIcon, isDarkMode && styles.darkActionIcon]}>
                  {action.icon}
                </View>
                <Text style={[styles.actionTitle, isDarkMode && styles.darkText]}>
                  {action.title}
                </Text>
                <Text style={[styles.actionDescription, isDarkMode && styles.darkSubtext]}>
                  {action.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  greeting: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[600],
  },
  userName: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.neutral[800],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkStatCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
    marginLeft: 6,
  },
  statValue: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.neutral[800],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
  },
  upcomingContainer: {
    marginBottom: theme.spacing.lg,
  },
  sessionCard: {
    height: 160,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkSessionCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sessionImage: {
    width: '100%',
    height: '100%',
  },
  sessionGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
  },
  sessionInfo: {
    justifyContent: 'flex-end',
  },
  sessionTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: '#fff',
    marginBottom: 4,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTime: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: '#fff',
    marginLeft: 6,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  actionCard: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionGradient: {
    padding: theme.spacing.lg,
    height: 160,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  darkActionIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  actionTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginBottom: 4,
  },
  actionDescription: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
  },
  darkText: {
    color: '#fff',
  },
  darkSubtext: {
    color: 'rgba(255,255,255,0.7)',
  },
});