import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { Search, Volume2, Star, BookOpen, MessageCircle } from 'lucide-react-native';

export default function PhrasebookScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'greetings', name: 'Greetings' },
    { id: 'basics', name: 'Basics' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'transportation', name: 'Transportation' }
  ];

  const phrases = [
    {
      id: '1',
      english: 'Hello',
      albanian: 'Përshëndetje',
      pronunciation: 'Per-shen-det-ye',
      category: 'greetings'
    },
    {
      id: '2',
      english: 'Good morning',
      albanian: 'Mirëmëngjes',
      pronunciation: 'Meer-meng-yes',
      category: 'greetings'
    },
    {
      id: '3',
      english: 'Good evening',
      albanian: 'Mirëmbrëma',
      pronunciation: 'Meer-mbrem-a',
      category: 'greetings'
    },
    {
      id: '4',
      english: 'Thank you',
      albanian: 'Faleminderit',
      pronunciation: 'Fah-le-min-der-it',
      category: 'basics'
    },
    {
      id: '5',
      english: 'Please',
      albanian: 'Ju lutem',
      pronunciation: 'You loo-tem',
      category: 'basics'
    },
    {
      id: '6',
      english: 'Yes',
      albanian: 'Po',
      pronunciation: 'Po',
      category: 'basics'
    },
    {
      id: '7',
      english: 'No',
      albanian: 'Jo',
      pronunciation: 'Yo',
      category: 'basics'
    },
    {
      id: '8',
      english: 'Help!',
      albanian: 'Ndihmë!',
      pronunciation: 'N-deem-uh',
      category: 'emergency'
    },
    {
      id: '9',
      english: 'I need a doctor',
      albanian: 'Më duhet një doktor',
      pronunciation: 'Muh doo-het n-yuh dok-tor',
      category: 'emergency'
    },
    {
      id: '10',
      english: 'Where is the bathroom?',
      albanian: 'Ku është tualeti?',
      pronunciation: 'Koo esh-te too-a-let-i',
      category: 'basics'
    },
    {
      id: '11',
      english: 'How much does it cost?',
      albanian: 'Sa kushton?',
      pronunciation: 'Sa koosh-ton',
      category: 'basics'
    },
    {
      id: '12',
      english: 'The bill, please',
      albanian: 'Faturën, ju lutem',
      pronunciation: 'Fa-too-ren, you loo-tem',
      category: 'food'
    },
    {
      id: '13',
      english: 'Delicious!',
      albanian: 'Shumë e shijshme!',
      pronunciation: 'Shoom-uh e shee-shme',
      category: 'food'
    },
    {
      id: '14',
      english: 'Where is the bus station?',
      albanian: 'Ku është stacioni i autobusit?',
      pronunciation: 'Koo esh-te sta-tsee-on-i i ow-to-boo-sit',
      category: 'transportation'
    },
    {
      id: '15',
      english: 'One ticket to...',
      albanian: 'Një biletë për...',
      pronunciation: 'N-yuh bi-let-uh per',
      category: 'transportation'
    }
  ];

  const filteredPhrases = phrases
    .filter(phrase => 
      (selectedCategory === 'all' || phrase.category === selectedCategory) &&
      (searchQuery === '' || 
        phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phrase.albanian.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      // Show favorites first
      const aIsFav = favorites.includes(a.id);
      const bIsFav = favorites.includes(b.id);
      
      if (aIsFav && !bIsFav) return -1;
      if (!aIsFav && bIsFav) return 1;
      return 0;
    });

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Albanian Phrasebook',
        }} 
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search phrases..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView 
          style={styles.phrasesContainer}
          contentContainerStyle={styles.phrasesContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredPhrases.length > 0 ? (
            filteredPhrases.map(phrase => (
              <View key={phrase.id} style={styles.phraseCard}>
                <View style={styles.phraseHeader}>
                  <View style={styles.phraseLanguages}>
                    <Text style={styles.phraseEnglish}>{phrase.english}</Text>
                    <Text style={styles.phraseAlbanian}>{phrase.albanian}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(phrase.id)}
                  >
                    <Star 
                      size={20} 
                      color={favorites.includes(phrase.id) ? '#F9A825' : Colors.textSecondary} 
                      fill={favorites.includes(phrase.id) ? '#F9A825' : 'none'}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.phrasePronunciation}>
                  <Text style={styles.pronunciationLabel}>Pronunciation: </Text>
                  {phrase.pronunciation}
                </Text>
                <TouchableOpacity style={styles.listenButton}>
                  <Volume2 size={16} color={Colors.primary} style={styles.listenIcon} />
                  <Text style={styles.listenText}>Listen</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MessageCircle size={40} color={Colors.textSecondary} style={styles.emptyIcon} />
              <Text style={styles.emptyText}>No phrases found</Text>
              <Text style={styles.emptySubtext}>Try a different search term or category</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <BookOpen size={20} color={Colors.primary} />
            <Text style={styles.footerButtonText}>Download Full Phrasebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: Colors.text,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: `${Colors.text}10`,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  phrasesContainer: {
    flex: 1,
  },
  phrasesContent: {
    padding: 16,
    paddingTop: 8,
  },
  phraseCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  phraseLanguages: {
    flex: 1,
  },
  phraseEnglish: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  phraseAlbanian: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  phrasePronunciation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  pronunciationLabel: {
    fontWeight: '500',
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listenIcon: {
    marginRight: 6,
  },
  listenText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: `${Colors.text}10`,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingVertical: 12,
    borderRadius: 12,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 8,
  },
});