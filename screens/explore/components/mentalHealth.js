import { styles } from "../style";
import { Sizes } from "../../../constants/styles";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mentalHealthAction } from "../../../redux/mentalHealth/mentalhealth.slice";

export const mentalHealth = (dataSelectedMental) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedid] = useState();

  const handleClickMentalHealth = (mentalhealth) => {
    const { id } = mentalhealth;
    setSelectedid(id);
    dispatch(
      mentalHealthAction.setSelectMentalHealth({ id: id, data: mentalhealth })
    );
  };

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = item.id === selectedId;
      return (
        <View>
          <View
            style={{
              justifyContent: "center",
              width: 120,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleClickMentalHealth(item)}
            >
              <SharedElement id={`${item.id}`}>
                <View
                  style={{
                    borderColor: isSelected ? "green" : "#004d25",
                    borderWidth: isSelected ? 2 : 1,
                    borderRadius: 50,
                    width: 70,
                    height: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    borderStyle: isSelected ? "dashed" : "solid",
                  }}
                >
                  <Image
                    source={{ uri: `${item.imageUrl}` }}
                    style={styles.popularSongImageStyle}
                  />
                </View>
              </SharedElement>
            </TouchableOpacity>

            <View>
              <Text style={styles.infoTextStyle}>{item.name}</Text>
            </View>
          </View>
        </View>
      );
    },
    [selectedId]
  );
  return (
    <View style={{ marginTop: Sizes.fixPadding }}>
      <View style={styles.titleWrapStyle}>
        <Text style={styles.titleStyle}>YOUR MENTAL HEALTH</Text>
      </View>
      {!dataSelectedMental ? (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#f8b26a" />
        </View>
      ) : dataSelectedMental.length > 0 ? (
        <FlatList
          data={dataSelectedMental}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Sizes.fixPadding,
            marginTop: 4,
          }}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#f8b26a" />
        </View>
      )}
    </View>
  );
};
