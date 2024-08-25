import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Button from './Button';

interface FilterModalProps {
  visible: boolean;
  categories: string[];
  onCategorySelect: (category: string) => void;
  onSortChange: (sortOption: string) => void;
  onLimitChange: (limitOption: string) => void;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  categories,
  onCategorySelect,
  onSortChange,
  onLimitChange,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [limitOption, setLimitOption] = useState<string>('10');

  const handleApplyFilters = () => {
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
    if (sortOption) {
      onSortChange(sortOption);
    }
    if (limitOption) {
      onLimitChange(limitOption);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filter & Sort</Text>

          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={itemValue => setSelectedCategory(itemValue)}
            style={styles.picker}>
            <Picker.Item label="All Categories" value="" />
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>

          <Text style={styles.label}>Sort By</Text>
          <Picker
            selectedValue={sortOption}
            onValueChange={itemValue => setSortOption(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Price: Low to High" value="asc" />
            <Picker.Item label="Price: High to Low" value="desc" />
          </Picker>
          <Text style={styles.label}>Limit</Text>
          <Picker
            selectedValue={limitOption}
            onValueChange={itemValue => setLimitOption(itemValue)}
            style={styles.picker}>
            <Picker.Item label="5 per page" value="5" />
            <Picker.Item label="10 per page" value="10" />
            <Picker.Item label="50 per page" value="50" />
          </Picker>
          <View style={styles.buttonContainer}>
            <Button title="Apply Filters" onPress={handleApplyFilters} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
});

export default FilterModal;
