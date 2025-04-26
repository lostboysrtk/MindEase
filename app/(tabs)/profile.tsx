import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/Theme';
import { User, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Award, Heart, Brain, CircleCheck } from 'lucide-react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [anonymousModeEnabled, setAnonymousModeEnabled] = useState(true);

  const achievementData = {
    streaks: {
      current: 3,
      best: 7,
    },
    minutes: 120,
    sessions: 12,
    achievements: [
      {
        id: '1',
        title: 'Early Bird',
        description: 'Complete 5 morning sessions',
        progress: 80,
        icon: <Brain size={18} color={theme.colors.primary[500]} />,
      },
      {
        id: '2',
        title: 'Calm Mind',
        description: 'Complete 10 meditation sessions',
        progress: 60,
        icon: <Heart size={18} color={theme.colors.secondary[500]} />,
      },
      {
        id: '3',
        title: 'Consistency',
        description: 'Complete a 7-day streak',
        progress: 40,
        icon: <CircleCheck size={18} color={theme.colors.accent[500]} />,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileEmail}>alex@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <AnimatedCircularProgress
              size={60}
              width={5}
              fill={achievementData.streaks.current * 100 / 7}
              tintColor={theme.colors.primary[500]}
              backgroundColor={theme.colors.neutral[200]}
              rotation={0}
            >
              {() => (
                <Text style={styles.statValue}>{achievementData.streaks.current}</Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <AnimatedCircularProgress
              size={60}
              width={5}
              fill={80}
              tintColor={theme.colors.secondary[500]}
              backgroundColor={theme.colors.neutral[200]}
              rotation={0}
            >
              {() => (
                <Text style={styles.statValue}>{achievementData.minutes}</Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statCard}>
            <AnimatedCircularProgress
              size={60}
              width={5}
              fill={70}
              tintColor={theme.colors.accent[500]}
              backgroundColor={theme.colors.neutral[200]}
              rotation={0}
            >
              {() => (
                <Text style={styles.statValue}>{achievementData.sessions}</Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {achievementData.achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementIconContainer}>
                {achievement.icon}
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${achievement.progress}%` }]} />
                </View>
              </View>
              <Text style={styles.achievementPercentage}>{achievement.progress}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Bell size={20} color={theme.colors.neutral[600]} />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.colors.neutral[300], true: theme.colors.primary[300] }}
              thumbColor={notificationsEnabled ? theme.colors.primary[500] : theme.colors.neutral[100]}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Shield size={20} color={theme.colors.neutral[600]} />
              <Text style={styles.settingLabel}>Anonymous Mode</Text>
            </View>
            <Switch
              value={anonymousModeEnabled}
              onValueChange={setAnonymousModeEnabled}
              trackColor={{ false: theme.colors.neutral[300], true: theme.colors.primary[300] }}
              thumbColor={anonymousModeEnabled ? theme.colors.primary[500] : theme.colors.neutral[100]}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <User size={20} color={theme.colors.neutral[600]} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: theme.colors.neutral[300], true: theme.colors.primary[300] }}
              thumbColor={darkModeEnabled ? theme.colors.primary[500] : theme.colors.neutral[100]}
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLabelContainer}>
              <Award size={20} color={theme.colors.neutral[600]} />
              <Text style={styles.menuLabel}>Subscription</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.neutral[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLabelContainer}>
              <HelpCircle size={20} color={theme.colors.neutral[600]} />
              <Text style={styles.menuLabel}>Help & Support</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.neutral[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLabelContainer}>
              <LogOut size={20} color={theme.colors.error[500]} />
              <Text style={[styles.menuLabel, { color: theme.colors.error[500] }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.appInfoSection}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.neutral[800],
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileSection: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: theme.colors.primary[500],
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  profileName: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[500],
  },
  editProfileButton: {
    backgroundColor: theme.colors.primary[50],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
  },
  editProfileText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
    marginTop: theme.spacing.xs,
  },
  achievementsSection: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
  },
  viewAllText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  achievementIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[100],
    marginRight: theme.spacing.md,
  },
  achievementInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  achievementTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.neutral[800],
    marginBottom: 2,
  },
  achievementDesc: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
    marginBottom: theme.spacing.sm,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: theme.colors.neutral[200],
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary[500],
  },
  achievementPercentage: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  settingsSection: {
    padding: theme.spacing.lg,
  },
  settingsTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginLeft: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  menuLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginLeft: theme.spacing.md,
  },
  appInfoSection: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  appVersion: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[500],
  },
});