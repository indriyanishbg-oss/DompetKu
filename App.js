import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

export default function App() {
  const [ket, setKet] = useState('');
  const [nominal, setNominal] = useState('');
  const [data, setData] = useState([]);

  const tambah = (tipe) => {
    if (!ket || !nominal) return;

    const itemBaru = {
      id: Date.now().toString(),
      ket,
      nominal: parseInt(nominal),
      tipe
    };

    setData([itemBaru, ...data]);
    setKet('');
    setNominal('');
  };

  const hapus = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const saldo = data.reduce((t, i) =>
    i.tipe === 'masuk' ? t + i.nominal : t - i.nominal
  , 0);

  const pemasukan = data
    .filter(i => i.tipe === 'masuk')
    .reduce((t, i) => t + i.nominal, 0);

  const pengeluaran = data
    .filter(i => i.tipe === 'keluar')
    .reduce((t, i) => t + i.nominal, 0);

  const format = (n) =>
    'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>💳 DompetKu Pro</Text>
        <Text style={styles.saldo}>{format(saldo)}</Text>
        <Text style={styles.subtitle}>Saldo Saat Ini</Text>
      </View>

      {/* STAT */}
      <View style={styles.statRow}>
        <View style={[styles.cardStat, { backgroundColor: '#16a34a' }]}>
          <Text style={styles.statText}>Pemasukan</Text>
          <Text style={styles.statValue}>{format(pemasukan)}</Text>
        </View>

        <View style={[styles.cardStat, { backgroundColor: '#dc2626' }]}>
          <Text style={styles.statText}>Pengeluaran</Text>
          <Text style={styles.statValue}>{format(pengeluaran)}</Text>
        </View>
      </View>

      {/* INPUT */}
      <View style={styles.card}>
        <TextInput
          placeholder="Deskripsi (contoh: Makan)"
          value={ket}
          onChangeText={setKet}
          style={styles.input}
        />

        <TextInput
          placeholder="Nominal"
          value={nominal}
          onChangeText={setNominal}
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.btnMasuk} onPress={() => tambah('masuk')}>
            <Text style={styles.btnText}>+ Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnKeluar} onPress={() => tambah('keluar')}>
            <Text style={styles.btnText}>- Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.ket}>{item.ket}</Text>
              <Text style={styles.badge}>
                {item.tipe === 'masuk' ? 'PEMASUKAN' : 'PENGELUARAN'}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{
                color: item.tipe === 'masuk' ? '#16a34a' : '#dc2626',
                fontWeight: 'bold'
              }}>
                {format(item.nominal)}
              </Text>

              <TouchableOpacity onPress={() => hapus(item.id)}>
                <Text style={{ color: '#888', marginTop: 5 }}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 15,
    marginTop: 30
  },

  /* HEADER */
  header: {
    backgroundColor: '#4f46e5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  saldo: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10
  },
  subtitle: {
    color: '#ddd'
  },

  /* STAT */
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardStat: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 3
  },
  statText: {
    color: 'white',
    fontSize: 12
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5
  },

  /* INPUT */
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnMasuk: {
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5
  },
  btnKeluar: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  /* LIST */
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ket: {
    fontWeight: 'bold',
    fontSize: 16
  },
  badge: {
    fontSize: 10,
    color: '#666',
    marginTop: 3
  }
});