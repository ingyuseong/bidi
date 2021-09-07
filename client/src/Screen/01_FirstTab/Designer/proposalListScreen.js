import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../../Components/Common/loading';
import CardInfo from '../../../Components/Card/cardInfo';
import CardChangeStyle from '../../../Components/Card/cardChangeStyle';
import ProposalDetailScreen from './proposalDetailScreen';
import { getProposalList } from '../../../Contexts/Proposal';

function ProposalListScreen({ navigation }) {
  const { data: proposalList, loading, error } = useSelector((state) => state.designerProposal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProposalList());
  }, [dispatch]);
  if (loading || error || !proposalList) return <Loading loading />;
  if (!proposalList.length)
    return (
      <View>
        <Text>No List</Text>
      </View>
    );
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {proposalList.map((proposal, index) => (
        <Swiper
          key={index}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          horizontal={false}>
          <View style={styles.listContainer}>
            <View style={{ height: '60%' }}>
              <CardChangeStyle
                before_src={proposal.before_src}
                after_src={proposal.after_src}
                height={'60%'}
                topRadius={true}
              />
            </View>
            <CardInfo
              info={proposal}
              navigation={navigation}
              height={150}
              tagBackgroundColor="#E1ECFF"
              tagColor="#323274"
            />
            <TouchableOpacity
              style={styles.bidiBtn}
              onPress={() =>
                navigation.navigate('ProposalDetail', {
                  proposal: proposalList[index],
                })
              }>
              <Icon name="pencil" size={25} style={styles.bidiIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.deatilContainer}>
            <ProposalDetailScreen navigation={navigation} props={{ proposal }} />
          </View>
        </Swiper>
      ))}
    </Swiper>
  );
}
const styles = StyleSheet.create({
  wrapper: {},
  listContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    position: 'relative',
  },
  deatilContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
  bidiBtn: {
    position: 'absolute',
    backgroundColor: '#0A0A32',
    width: 60,
    height: 60,
    right: 0,
    top: '52%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidiIcon: {
    color: 'white',
  },
});

export default ProposalListScreen;
