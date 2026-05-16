import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { clearCart } from '../store/cart/cartSlice';
import { addOrder } from '../store/orders/ordersSlice';
import { updateProfile } from '../store/users/usersSlice';

export default function CheckoutScreen() {
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    pib: user.pib || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const handleConfirm = () => {
    if (!form.pib || !form.email || !form.phone || !form.address) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    // Save user info
    dispatch(updateProfile(form));

    // Save order to history
    dispatch(addOrder({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: totalAmount
    }));

    // Clear cart
    dispatch(clearCart());

    Alert.alert(
      'Success',
      'Your order has been placed successfully!',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)/history') }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Full Name (PIB)</Text>
        <TextInput
          style={styles.input}
          value={form.pib}
          onChangeText={(text) => setForm({ ...form, pib: text })}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={form.address}
          onChangeText={(text) => setForm({ ...form, address: text })}
          placeholder="Enter your delivery address"
          multiline
          numberOfLines={3}
        />

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <Text style={styles.summaryText}>Total Amount: ${totalAmount.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
