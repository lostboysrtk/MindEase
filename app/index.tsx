import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { theme } from '@/constants/Theme';
import { HeartHandshake, Brain, ArrowRight } from 'lucide-react-native';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const onboardingSteps = [
    {
      title: 'Welcome to MindWell',
      description:
        'Your personal mental health companion. Track your moods, practice mindfulness, and connect with others on your journey to wellbeing.',
      image:
        'https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'How are you feeling today?',
      description:
        'Your emotional wellbeing matters. Let us know how you feel so we can personalize your experience.',
      isMoodSelection: true,
    },
    {
      title: 'Start Your Journey',
      description:
        'Track your moods, practice mindfulness, and connect with a supportive community. Your path to better mental health starts here.',
      icons: true,
    },
  ];

  const moods = [
    { emoji: '😔', label: 'Sad', value: 1 },
    { emoji: '😟', label: 'Anxious', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '🙂', label: 'Content', value: 4 },
    { emoji: '😄', label: 'Happy', value: 5 },
  ];

  const handleNext = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const selectMood = (value: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedMood(value);
  };

  const renderStep = () => {
    const step = onboardingSteps[currentStep];

    return (
      <View style={styles.stepContainer}>
        {step.image && (
          <Image
            source={{ uri: step.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>

        {step.isMoodSelection && (
          <View style={styles.moodContainer}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[
                  styles.moodOption,
                  selectedMood === mood.value && styles.selectedMood,
                ]}
                onPress={() => selectMood(mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step.icons && (
          <View style={styles.featureContainer}>
            <View style={styles.featureItem}>
              <View style={styles.iconContainer}>
                <HeartHandshake
                  size={24}
                  color={theme.colors.primary[600]}
                  strokeWidth={2}
                />
              </View>
              <Text style={styles.featureText}>Supportive Community</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.iconContainer}>
                <Brain
                  size={24}
                  color={theme.colors.primary[600]}
                  strokeWidth={2}
                />
              </View>
              <Text style={styles.featureText}>Mental Wellness Tools</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          theme.colors.primary[50],
          theme.colors.secondary[50],
          '#ffffff',
        ]}
        style={styles.background}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStep()}

        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={
            onboardingSteps[currentStep].isMoodSelection && selectedMood === null
          }
        >
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ArrowRight color="#fff" size={20} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[600],
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.neutral[300],
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary[500],
    width: 24,
  },
  nextButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  nextButtonText: {
    fontFamily: theme.typography.fontFamily.body,
    fontWeight: theme.typography.fontWeight.medium,
    color: '#fff',
    fontSize: theme.typography.fontSize.md,
    marginRight: theme.spacing.sm,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  moodOption: {
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: theme.colors.neutral[50],
    width: 60,
  },
  selectedMood: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.neutral[700],
  },
  featureContainer: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.neutral[800],
  },
});

export default OnboardingScreen;