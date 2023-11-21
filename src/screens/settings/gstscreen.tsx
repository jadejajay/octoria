/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
import IonIcons from '@expo/vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import * as React from 'react';
import { Modal, StyleSheet, ToastAndroid } from 'react-native';

import { useFirestoreDocLiveQuery } from '@/core';
import {
  ActivityIndicator,
  AnimatedButton,
  Input,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

type Props = {};
export const GstView = ({}: Props) => {
  const [search, setSearch] = React.useState('');
  const [result, setResult] = React.useState(
    null as unknown as {
      data: string;
      message: string;
      flag: boolean;
    }
  );
  const [loading, setLoading] = React.useState(false);
  const apiKey = useFirestoreDocLiveQuery('links', 'gstapi');

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(
        `https://sheet.gstincheck.co.in/check/${
          apiKey?.data?.apikey
        }/${search.toUpperCase()}`
      )
      .then((res) => {
        setResult(res.data);

        setLoading(false);
      });
    setLoading(false);
  };
  const handleClear = () => {
    setSearch('');
  };

  if (result === null) {
    return (
      <View className="mt-20 w-screen items-center">
        <Text className="text-xl text-indigo-600">
          Find GST Number Information
        </Text>
        <View className="w-screen p-3">
          <Input
            className="m-2 w-max rounded-lg border  border-indigo-600 p-2 pr-10"
            placeholder=" Ex : 24AAAAA0000A1Z5"
            value={search}
            onChangeText={(e) => {
              setSearch(e);
            }}
            onEndEditing={() => {
              handleSearch();
            }}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            className="absolute right-7 top-7"
            onPress={handleSearch}
          >
            <IonIcons name="search" size={24} color="rgb(79, 70, 229)" />
          </TouchableOpacity>
          {search && (
            <TouchableOpacity
              className="absolute right-14 top-7"
              onPress={handleClear}
            >
              <IonIcons name="close" size={24} color="rgb(79, 70, 229)" />
            </TouchableOpacity>
          )}
        </View>
        <Modal visible={loading} style={{ flex: 1 }} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={'rgb(79, 70, 229)'} />
          </View>
        </Modal>
      </View>
    );
  }
  if (result?.flag === false) {
    return (
      <View className="mt-4 flex-1">
        <View className="mt-4 w-screen items-center">
          <Text className="text-xl text-indigo-600">
            Find GST Number Information
          </Text>
          <Modal visible={loading} style={{ flex: 1 }} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" color={'rgb(79, 70, 229)'} />
            </View>
          </Modal>
          <View className="w-screen p-3">
            <Input
              className="m-2 w-max rounded-lg border  border-indigo-600 p-2 pr-10"
              placeholder=" Ex : 24AAAAA0000A1Z5"
              value={search}
              onChangeText={(e) => {
                setSearch(e);
              }}
              onEndEditing={() => {
                handleSearch();
              }}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              className="absolute right-7 top-7"
              onPress={handleSearch}
            >
              <IonIcons name="search" size={24} color="rgb(79, 70, 229)" />
            </TouchableOpacity>
            {search && (
              <TouchableOpacity
                className="absolute right-14 top-7"
                onPress={handleClear}
              >
                <IonIcons name="close" size={24} color="rgb(79, 70, 229)" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className="pl-4 text-xl text-red-700">{result?.message}</Text>
      </View>
    );
  }
  return (
    <View>
      <View
        className="mt-20 w-screen items-center"
        style={{ backgroundColor: 'white', elevation: 4 }}
      >
        <Text className="text-xl text-indigo-600">
          Find GST Number Information
        </Text>
        <View className="w-screen p-3">
          <Input
            className="m-2 w-max rounded-lg border  border-indigo-600 p-2 pr-10"
            placeholder=" Ex : 24AAAAA0000A1Z5"
            value={search}
            onChangeText={(e) => {
              setSearch(e);
            }}
            onEndEditing={() => {
              handleSearch();
            }}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            className="absolute right-7 top-7"
            onPress={handleSearch}
          >
            <IonIcons name="search" size={24} color="rgb(79, 70, 229)" />
          </TouchableOpacity>
          {search && (
            <TouchableOpacity
              className="absolute right-14 top-7"
              onPress={handleClear}
            >
              <IonIcons name="close" size={24} color="rgb(79, 70, 229)" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal visible={loading} style={{ flex: 1 }} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={'rgb(79, 70, 229)'} />
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChildComponent gstData={result?.data} />
        <View className="h-80 w-full" />
      </ScrollView>
    </View>
  );
};
///27AAIFI7840J1ZZ
const ChildComponent = ({ gstData }: { gstData: any }) => {
  return (
    <View className="overflow-scroll p-3">
      <InfoCard title="GSTIN:" data={gstData?.gstin} />
      <InfoCard title="Local Name:" data={gstData?.lgnm} />
      <InfoCard title="Trade Name:" data={gstData?.tradeNam} />
      <InfoCard title="State Jurisdiction Code:" data={gstData?.stjCd} />
      <InfoCard title="Constitution of Business:" data={gstData?.ctb} />
      <InfoCard title="Date of Registration:" data={gstData?.rgdt} />
      <InfoCard title="Last Updated Date:" data={gstData?.lstupdt} />
      <InfoCard title="Taxpayer Type" data={gstData?.ctj} />
      <InfoCard title="GST Frequency Type" data={gstData?.frequencyType} />
      <InfoCard title="GST Status" data={gstData?.sts} />
      <InfoCard title="Details Type" data={gstData?.dty} />
      <InfoCard title="Local Name" data={gstData?.lgnm} />
      <InfoCard title="State Jurisdiction" data={gstData?.stj} />
      <InfoCard title="Circle (Central Tax)" data={gstData?.cxdt} />
      <InfoCard title={'Nature of Business Activities'} data={gstData?.nba} />
      <CustomCard>
        <ChildText>Principal Address:</ChildText>
        <ChildText2> - Nature: {gstData?.pradr?.ntr}</ChildText2>
        <ChildText2>
          {' '}
          - Address: {gstData?.pradr?.addr?.st}, {gstData?.pradr?.addr?.loc},{' '}
          {gstData?.pradr?.addr?.dst}, {gstData?.pradr?.addr?.stcd} -{' '}
          {gstData?.pradr?.addr?.pncd}
        </ChildText2>
        <ChildText>Additional Addresses:</ChildText>
        {gstData?.adadr?.length > 0 ? (
          <InfoCard title="Additional Addresses" data={gstData?.adadr} />
        ) : (
          <Text>No additional addresses found.</Text>
        )}
      </CustomCard>
    </View>
  );
};

const ChildText = ({ children }: { children: any }) => {
  return (
    <Text className="font-varela text-base text-stone-900">{children}</Text>
  );
};
const ChildText2 = ({ children }: { children: any }) => {
  return (
    <Text className="font-varela text-base text-green-600">{children}</Text>
  );
};

const InfoCard = ({ title, data }: { title: string; data: any }) => {
  const handleClip = () => {
    if (data) {
      Clipboard.setString(data);
      ToastAndroid.show('Copied To Clipboard', ToastAndroid.SHORT);
    }
  };
  return (
    <AnimatedButton onClick={() => handleClip()}>
      <View style={styles.cardContainer}>
        <Text className="font-varela text-base text-stone-900">{title}</Text>
        {typeof data === 'string' ? (
          <Text className="font-varela text-base text-green-600">
            {data ?? '-'}
          </Text>
        ) : (
          data?.map((item: string, index: number) => (
            <Text key={index} className="font-varela text-base text-green-600">
              {item}
            </Text>
          ))
        )}
      </View>
    </AnimatedButton>
  );
};

const CustomCard = ({ children }: { children: any }) => {
  return <View style={styles.cardContainer2}>{children}</View>;
};
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardData: {
    fontSize: 16,
  },
  cardContainer2: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
