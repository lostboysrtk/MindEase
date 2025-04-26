import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/Theme';
import { CirclePlus as PlusCircle, Calendar, ChartBar as BarChart3, SquarePen as PenSquare, Send } from 'lucide-react-native';
import dayjs from 'dayjs';

interface MoodEntry {
  id: string;
  date: Date;
  mood: number;
  note: string;
}

export default function MoodScreen() {
  const today = dayjs();
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(today);
  const [newNote, setNewNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  // Sample mood entries for demo
  const [moodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: today.subtract(1, 'day').toDate(),
      mood: 4,
      note: 'Feeling good today. Had a productive morning and took time to meditate.',
    },
    {
      id: '2',
      date: today.subtract(2, 'day').toDate(),
      mood: 2,
      note: 'Anxiety was pretty high today. Need to practice more breathing exercises.',
    },
    {
      id: '3',
      date: today.subtract(4, 'day').toDate(),
      mood: 3,
      note: 'Feeling balanced. Work was okay.',
    },
  ]);

  const moods = [
    { value: 1, emoji: '😔', label: 'Sad' },
    { value: 2, emoji: '😟', label: 'Anxious' },
    { value: 3, emoji: '😐', label: 'Neutral' },
    { value: 4, emoji: '🙂', label: 'Content' },
    { value: 5, emoji: '😄', label: 'Happy' },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getMoodForDate = (date: Date) => {
    const entry = moodEntries.find(
      (entry) => dayjs(entry.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
    );
    return entry ? entry.mood : null;
  };

  const renderCalendarView = () => {
    const currentMonth = selectedDate.month();
    const currentYear = selectedDate.year();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    
    // Get first day of month
    const firstDayOfMonth = dayjs(new Date(currentYear, currentMonth, 1)).day();
    
    // Create array of weekday headers
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.monthSelector}>
          <TouchableOpacity
            onPress={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
          >
            <Text style={styles.monthArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {selectedDate.format('MMMM YYYY')}
          </Text>
          <TouchableOpacity
            onPress={() => setSelectedDate(selectedDate.add(1, 'month'))}
          >
            <Text style={styles.monthArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysContainer}>
          {weekdays.map((day, index) => (
            <Text key={index} style={styles.weekdayLabel}>{day}</Text>
          ))}
        </View>

        <View style={styles.daysContainer}>
          {/* Add empty cells for days before the first day of month */}
          {Array(firstDayOfMonth)
            .fill(null)
            .map((_, index) => (
              <View key={`empty-${index}`} style={styles.emptyDay} />
            ))}

          {/* Render days of month */}
          {daysInMonth.map((date, index) => {
            const mood = getMoodForDate(date);
            const isToday = dayjs(date).format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
            const isSelected = dayjs(date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD');

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  isToday && styles.todayCell,
                  isSelected && styles.selectedCell,
                ]}
                onPress={() => setSelectedDate(dayjs(date))}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    isToday && styles.todayText,
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {date.getDate()}
                </Text>
                {mood && (
                  <Text style={styles.moodIndicator}>
                    {moods.find((m) => m.value === mood)?.emoji}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.selectedDateMood}>
          <Text style={styles.selectedDateText}>
            {selectedDate.format('dddd, MMMM D, YYYY')}
          </Text>
          
          {/* Show existing mood entry or option to add new one */}
          {getMoodForDate(selectedDate.toDate()) ? (
            <View style={styles.existingMoodContainer}>
              <Text style={styles.existingMoodEmoji}>
                {moods.find((m) => m.value === getMoodForDate(selectedDate.toDate()))?.emoji}
              </Text>
              <Text style={styles.existingMoodLabel}>
                {moods.find((m) => m.value === getMoodForDate(selectedDate.toDate()))?.label}
              </Text>
              
              {/* Display note if it exists */}
              {moodEntries
                .find((entry) => dayjs(entry.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD'))
                ?.note && (
                <View style={styles.noteContainer}>
                  <Text style={styles.noteText}>
                    {moodEntries.find(
                      (entry) => dayjs(entry.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
                    )?.note}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <TouchableOpacity style={styles.addMoodButton}>
              <PlusCircle size={20} color={theme.colors.primary[500]} />
              <Text style={styles.addMoodText}>Add Mood Entry</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderTrendsView = () => {
    return (
      <View style={styles.trendsContainer}>
        <View style={styles.trendsHeader}>
          <Text style={styles.trendsTitle}>Mood Over Time</Text>
          <View style={styles.periodSelector}>
            <TouchableOpacity style={styles.periodButton}>
              <Text style={styles.periodButtonTextActive}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.periodButton}>
              <Text style={styles.periodButtonText}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.periodButton}>
              <Text style={styles.periodButtonText}>Year</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* This would be a chart in a real app */}
        <View style={styles.chartPlaceholder}>
          <View style={styles.chartAxis}>
            <Text style={styles.axisLabel}>Happy</Text>
            <Text style={styles.axisLabel}>Content</Text>
            <Text style={styles.axisLabel}>Neutral</Text>
            <Text style={styles.axisLabel}>Anxious</Text>
            <Text style={styles.axisLabel}>Sad</Text>
          </View>
          <View style={styles.chartBars}>
            {/* Simplified chart - would use a real chart library in production */}
            <View style={[styles.chartBar, { height: 100 }]} />
            <View style={[styles.chartBar, { height: 60 }]} />
            <View style={[styles.chartBar, { height: 80 }]} />
            <View style={[styles.chartBar, { height: 40 }]} />
            <View style={[styles.chartBar, { height: 70 }]} />
            <View style={[styles.chartBar, { height: 90 }]} />
            <View style={[styles.chartBar, { height: 110 }]} />
          </View>
        </View>

        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>Mood Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              Your mood tends to be higher in the mornings. Consider scheduling important tasks during this time.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              You've had 3 days of anxiety this month. Try the guided breathing exercises to help manage stress.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderJournalView = () => {
    return (
      <View style={styles.journalContainer}>
        <View style={styles.currentMoodContainer}>
          <Text style={styles.currentMoodTitle}>How are you feeling right now?</Text>
          <View style={styles.moodSelector}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[
                  styles.moodOption,
                  selectedMood === mood.value && styles.selectedMoodOption,
                ]}
                onPress={() => setSelectedMood(mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.journalEntryContainer}>
          <Text style={styles.journalEntryTitle}>Write your thoughts</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline
              style={styles.journalInput}
              placeholder="What's on your mind today?"
              value={newNote}
              onChangeText={setNewNote}
            />
          </View>
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              (!selectedMood || !newNote) && styles.saveButtonDisabled
            ]}
            disabled={!selectedMood || !newNote}
          >
            <Text style={styles.saveButtonText}>Save Entry</Text>
            <Send size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.recentEntriesContainer}>
          <Text style={styles.recentEntriesTitle}>Recent Journal Entries</Text>
          {moodEntries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View style={styles.entryDate}>
                  <Text style={styles.entryDay}>
                    {dayjs(entry.date).format('ddd, MMM D')}
                  </Text>
                  <Text style={styles.entryMood}>
                    {moods.find((m) => m.value === entry.mood)?.emoji}{' '}
                    {moods.find((m) => m.value === entry.mood)?.label}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <PenSquare size={16} color={theme.colors.neutral[500]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.entryText}>
                {entry.note}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mood Tracker</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
          onPress={() => setActiveTab('calendar')}
        >
          <Calendar
            size={20}
            color={
              activeTab === 'calendar'
                ? theme.colors.primary[600]
                : theme.colors.neutral[500]
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'calendar' && styles.activeTabText,
            ]}
          >
            Calendar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'trends' && styles.activeTab]}
          onPress={() => setActiveTab('trends')}
        >
          <BarChart3
            size={20}
            color={
              activeTab === 'trends'
                ? theme.colors.primary[600]
                : theme.colors.neutral[500]
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'trends' && styles.activeTabText,
            ]}
          >
            Trends
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'journal' && styles.activeTab]}
          onPress={() => setActiveTab('journal')}
        >
          <PenSquare
            size={20}
            color={
              activeTab === 'journal'
                ? theme.colors.primary[600]
                : theme.colors.neutral[500]
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'journal' && styles.activeTabText,
            ]}
          >
            Journal
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'calendar' && renderCalendarView()}
        {activeTab === 'trends' && renderTrendsView()}
        {activeTab === 'journal' && renderJournalView()}
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    paddingHorizontal: theme.spacing.lg,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginRight: theme.spacing.lg,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary[500],
  },
  tabText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[500],
    marginLeft: theme.spacing.xs,
  },
  activeTabText: {
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeight.medium,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  // Calendar View Styles
  calendarContainer: {
    padding: theme.spacing.lg,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  monthTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
  },
  monthArrow: {
    fontSize: 24,
    color: theme.colors.primary[500],
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.sm,
  },
  weekdayLabel: {
    width: 40,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[500],
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 2,
  },
  dayCell: {
    width: 40,
    height: 40,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  todayCell: {
    backgroundColor: theme.colors.primary[100],
  },
  selectedCell: {
    backgroundColor: theme.colors.primary[500],
  },
  dayNumber: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[800],
  },
  todayText: {
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[600],
  },
  selectedDayText: {
    color: '#fff',
  },
  moodIndicator: {
    fontSize: 12,
    marginTop: 2,
  },
  selectedDateMood: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
  },
  selectedDateText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[700],
    marginBottom: theme.spacing.sm,
  },
  existingMoodContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  existingMoodEmoji: {
    fontSize: 40,
    marginBottom: theme.spacing.xs,
  },
  existingMoodLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[700],
    marginBottom: theme.spacing.sm,
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
    width: '100%',
  },
  noteText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    lineHeight: 24,
  },
  addMoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[50],
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
  },
  addMoodText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary[500],
    marginLeft: theme.spacing.sm,
  },
  // Trends View Styles
  trendsContainer: {
    padding: theme.spacing.lg,
  },
  trendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  trendsTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: theme.colors.neutral[100],
    borderRadius: theme.borderRadius.full,
    padding: 4,
  },
  periodButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
  },
  periodButtonText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
  },
  periodButtonTextActive: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  chartPlaceholder: {
    height: 200,
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  chartAxis: {
    width: 70,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  axisLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.neutral[500],
    textAlign: 'right',
    paddingRight: 10,
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  chartBar: {
    width: 20,
    backgroundColor: theme.colors.primary[400],
    borderRadius: theme.borderRadius.md,
  },
  insightsContainer: {
    marginTop: theme.spacing.lg,
  },
  insightsTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
  },
  insightCard: {
    backgroundColor: theme.colors.neutral[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary[500],
  },
  insightText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[700],
    lineHeight: 24,
  },
  // Journal View Styles
  journalContainer: {
    padding: theme.spacing.lg,
  },
  currentMoodContainer: {
    backgroundColor: theme.colors.primary[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  currentMoodTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    width: 60,
  },
  selectedMoodOption: {
    borderColor: theme.colors.primary[500],
    backgroundColor: '#fff',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.neutral[700],
  },
  journalEntryContainer: {
    marginBottom: theme.spacing.lg,
  },
  journalEntryTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
  },
  textInputContainer: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  journalInput: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    minHeight: 120,
    padding: theme.spacing.sm,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: theme.colors.neutral[300],
  },
  saveButtonText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: '#fff',
    fontWeight: theme.typography.fontWeight.medium,
    marginRight: theme.spacing.sm,
  },
  recentEntriesContainer: {
    marginTop: theme.spacing.lg,
  },
  recentEntriesTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.md,
  },
  entryCard: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  entryDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDay: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.neutral[700],
    marginRight: theme.spacing.sm,
  },
  entryMood: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[600],
  },
  editButton: {
    padding: 4,
  },
  entryText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
    lineHeight: 24,
  },
});