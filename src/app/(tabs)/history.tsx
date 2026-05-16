import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/useRedux';

export default function HistoryScreen() {
  const history = useAppSelector((state) => state.orders.history);

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No order history yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{item.id.slice(0, 8)}</Text>
              <Text style={styles.orderDate}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.itemsList}>
              {item.items.map((product) => (
                <Text key={product.id} style={styles.itemText}>
                  • {product.name} ({product.quantity}x)
                </Text>
              ))}
            </View>
            <Text style={styles.totalAmount}>Total: ${item.totalAmount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  orderCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderDate: {
    color: '#666',
  },
  itemsList: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#007AFF',
  },
});
