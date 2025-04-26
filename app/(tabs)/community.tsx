import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/Theme';
import {
  Search,
  Filter,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Users,
  CalendarClock,
  BookOpen,
} from 'lucide-react-native';

interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  image: string;
  category: string;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  time: string;
  content: string;
  likes: number;
  comments: number;
  group?: string;
}

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  const groups: CommunityGroup[] = [
    {
      id: '1',
      name: 'Anxiety Support',
      members: 2458,
      image: 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Support',
    },
    {
      id: '2',
      name: 'Mindfulness Practice',
      members: 1872,
      image: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Mindfulness',
    },
    {
      id: '3',
      name: 'Sleep & Relaxation',
      members: 1245,
      image: 'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Wellness',
    },
    {
      id: '4',
      name: 'Depression Recovery',
      members: 3104,
      image: 'https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Support',
    },
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Anonymous User',
        avatar: 'https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      time: '15 minutes ago',
      content: 'I tried the breathing technique from yesterday\'s session, and it really helped with my anxiety! Has anyone else had success with it?',
      likes: 24,
      comments: 7,
      group: 'Anxiety Support',
    },
    {
      id: '2',
      author: {
        name: 'Anonymous User',
        avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      time: '1 hour ago',
      content: 'Feeling really down today. Any suggestions for quick mood boosters?',
      likes: 18,
      comments: 12,
    },
    {
      id: '3',
      author: {
        name: 'Anonymous User',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      time: '3 hours ago',
      content: 'Just completed a 7-day mindfulness streak! Noticed a big difference in my stress levels.',
      likes: 42,
      comments: 9,
      group: 'Mindfulness Practice',
    },
  ];

  const events = [
    {
      id: '1',
      title: 'Group Meditation',
      date: 'Tomorrow, 7:00 PM',
      participants: 18,
      image: 'https://images.pexels.com/photos/8436742/pexels-photo-8436742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      title: 'Anxiety Workshop',
      date: 'Saturday, 3:00 PM',
      participants: 24,
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const renderFeedTab = () => (
    <View style={styles.feedContainer}>
      <View style={styles.postInput}>
        <TouchableOpacity style={styles.postInputButton}>
          <Plus size={20} color="#fff" />
          <Text style={styles.postInputButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>

      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
            <View style={styles.postMeta}>
              <Text style={styles.authorName}>{post.author.name}</Text>
              <View style={styles.postDetails}>
                <Text style={styles.postTime}>{post.time}</Text>
                {post.group && (
                  <>
                    <Text style={styles.postDetailsSeparator}>•</Text>
                    <Text style={styles.postGroup}>{post.group}</Text>
                  </>
                )}
              </View>
            </View>
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postAction}>
              <Heart size={18} color={theme.colors.neutral[500]} />
              <Text style={styles.postActionText}>{post.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.postAction}>
              <MessageCircle size={18} color={theme.colors.neutral[500]} />
              <Text style={styles.postActionText}>{post.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.postAction}>
              <Share2 size={18} color={theme.colors.neutral[500]} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderGroupsTab = () => (
    <View style={styles.groupsContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Groups</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={groups.slice(0, 2)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.myGroupsList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.myGroupCard}>
            <Image source={{ uri: item.image }} style={styles.myGroupImage} />
            <View style={styles.myGroupInfo}>
              <Text style={styles.myGroupName}>{item.name}</Text>
              <View style={styles.myGroupMeta}>
                <Users size={14} color={theme.colors.neutral[500]} />
                <Text style={styles.myGroupMembers}>{item.members} members</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Discover Groups</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.discoverGroupsList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.discoverGroupItem}>
            <Image source={{ uri: item.image }} style={styles.discoverGroupImage} />
            <View style={styles.discoverGroupInfo}>
              <Text style={styles.discoverGroupName}>{item.name}</Text>
              <View style={styles.discoverGroupMeta}>
                <Users size={14} color={theme.colors.neutral[500]} />
                <Text style={styles.discoverGroupMembers}>{item.members} members</Text>
              </View>
              <View style={styles.discoverGroupCategory}>
                <Text style={styles.discoverGroupCategoryText}>{item.category}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderEventsTab = () => (
    <View style={styles.eventsContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      </View>
      
      {events.map((event) => (
        <TouchableOpacity key={event.id} style={styles.eventCard}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventMeta}>
              <View style={styles.eventMetaItem}>
                <CalendarClock size={14} color={theme.colors.neutral[500]} />
                <Text style={styles.eventMetaText}>{event.date}</Text>
              </View>
              <View style={styles.eventMetaItem}>
                <Users size={14} color={theme.colors.neutral[500]} />
                <Text style={styles.eventMetaText}>{event.participants} attending</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.attendButton}>
              <Text style={styles.attendButtonText}>Attend</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Resources</Text>
      </View>
      
      <TouchableOpacity style={styles.resourceCard}>
        <View style={styles.resourceIcon}>
          <BookOpen size={24} color={theme.colors.primary[600]} />
        </View>
        <View style={styles.resourceInfo}>
          <Text style={styles.resourceTitle}>Anxiety Management Guide</Text>
          <Text style={styles.resourceDesc}>Learn practical techniques to manage anxiety in daily life</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.resourceCard}>
        <View style={[styles.resourceIcon, { backgroundColor: theme.colors.secondary[100] }]}>
          <BookOpen size={24} color={theme.colors.secondary[600]} />
        </View>
        <View style={styles.resourceInfo}>
          <Text style={styles.resourceTitle}>Sleep Improvement Techniques</Text>
          <Text style={styles.resourceDesc}>Expert tips for better sleep quality and duration</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.neutral[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search community..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.neutral[400]}
          />
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'feed' && styles.activeTabText,
            ]}
          >
            Feed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'groups' && styles.activeTabText,
            ]}
          >
            Groups
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'events' && styles.activeTabText,
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'feed' && renderFeedTab()}
        {activeTab === 'groups' && renderGroupsTab()}
        {activeTab === 'events' && renderEventsTab()}
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
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.neutral[800],
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    paddingHorizontal: theme.spacing.lg,
  },
  tab: {
    paddingVertical: theme.spacing.md,
    marginRight: theme.spacing.xl,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary[500],
  },
  tabText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[500],
  },
  activeTabText: {
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeight.medium,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Feed Tab Styles
  feedContainer: {
    padding: theme.spacing.lg,
  },
  postInput: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  postInputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  postInputButtonText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: '#fff',
    fontWeight: theme.typography.fontWeight.medium,
    marginLeft: theme.spacing.xs,
  },
  postCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  postMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  authorName: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.neutral[800],
    marginBottom: 2,
  },
  postDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTime: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[500],
  },
  postDetailsSeparator: {
    marginHorizontal: 4,
    color: theme.colors.neutral[400],
  },
  postGroup: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
  },
  postContent: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    paddingTop: theme.spacing.sm,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
  },
  postActionText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[500],
    marginLeft: 4,
  },
  // Groups Tab Styles
  groupsContainer: {
    padding: theme.spacing.lg,
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
  viewAllButton: {},
  viewAllText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  myGroupsList: {
    paddingBottom: theme.spacing.lg,
  },
  myGroupCard: {
    width: 240,
    height: 140,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  myGroupImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  myGroupInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  myGroupName: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: '#fff',
    marginBottom: 4,
  },
  myGroupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myGroupMembers: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[200],
    marginLeft: 4,
  },
  discoverGroupsList: {
    paddingBottom: theme.spacing.lg,
  },
  discoverGroupItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  discoverGroupImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  discoverGroupInfo: {
    flex: 1,
  },
  discoverGroupName: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.neutral[800],
    marginBottom: 4,
  },
  discoverGroupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  discoverGroupMembers: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[500],
    marginLeft: 4,
  },
  discoverGroupCategory: {
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  discoverGroupCategoryText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary[500],
  },
  joinButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'center',
  },
  joinButtonText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: '#fff',
    fontWeight: theme.typography.fontWeight.medium,
  },
  // Events Tab Styles
  eventsContainer: {
    padding: theme.spacing.lg,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  eventImage: {
    width: 100,
    height: '100%',
  },
  eventInfo: {
    flex: 1,
    padding: theme.spacing.md,
  },
  eventTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.xs,
  },
  eventMeta: {
    marginBottom: theme.spacing.sm,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventMetaText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
    marginLeft: 6,
  },
  attendButton: {
    backgroundColor: theme.colors.primary[100],
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  attendButtonText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeight.medium,
  },
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.neutral[800],
    marginBottom: 4,
  },
  resourceDesc: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
    lineHeight: 20,
  },
});