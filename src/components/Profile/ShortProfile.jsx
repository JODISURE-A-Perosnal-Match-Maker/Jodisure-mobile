import React, { useState } from 'react';
import ImageView from "react-native-image-viewing";
import { View, TouchableOpacity } from "react-native";
import PhotoGrid from '../PhotoGrid';
import Theme from '../Theme';

import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction:column;
    /* width: 100%; */
`;
const Row = styled.View`
  flex-direction:row;
  align-items:center;
  justify-content:flex-end;
`;
const Col = styled.View`
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
const OnlineText = styled.Text`
  font-size:11px;
  letter-spacing:0.51px;
  font-family:Barlow-SemiBold;
  background-color:#00b6cd;
  padding:2px;
  padding-right:10px;
  padding-left:10px;
  border-radius:4px;
  margin:4px;
  margin-right:25px;
  color:#fff;
  align-self:flex-end;
`;

const Div = styled.View`
    flex-direction:row;
`;

const ProfileDetails = styled.View`
    background-color:#fffafb;
    border-radius:8px;
    flex-direction:row;
    align-items:center;
    height:219px;
    margin:17px;
`;

const VBar = styled.View`
    height:153px;
    width:1px;
    background-color:#ededed;
`;

const PDetailContainer = styled.View`
    /* background-color:red; */
    height:219px;
    flex:1;
    padding:19px;
`;

const LabelContainer = styled.View`
    margin-bottom:12px;
`;

const BtnViewProfile = styled.View`
    background-color:#bd6f9e;
    border-color:#a05b85;
    border-radius:20px;
    height:32px;
    width:162px;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`;

const BtnContainer = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:12px;
    margin-bottom:17px;
`;



const ShrotProfile = ({ profile }) => {
    const [visible, setIsVisible] = useState(false);
    const showImage = (image) => {
        setIsVisible(true);
    };
    if(!profile || !profile.dob){
      return (<Text>Incomplete profile</Text>)
    }
    const images = [
        'https://images.pexels.com/photos/2998816/pexels-photo-2998816.jpeg?cs=srgb&dl=pexels-necati-anil-cakirman-2998816.jpg&fm=jpg',
        'https://images.pexels.com/photos/904117/pexels-photo-904117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/3053504/pexels-photo-3053504.jpeg?cs=srgb&dl=pexels-nothing-ahead-3053504.jpg&fm=jpg',
        'https://images.pexels.com/photos/2598221/pexels-photo-2598221.jpeg?cs=srgb&dl=pexels-mattheus-wilkisom-dias-santos-2598221.jpg&fm=jpg',
        'https://images.pexels.com/photos/1807113/pexels-photo-1807113.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1807113.jpg&fm=jpg',
        'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
    ];
    return (
        <Container>

            <PhotoGrid source={images} onPressImage={source => showImage(source.uri)}></PhotoGrid>
            <ImageView
                images={images.map((i) => {
                    return { uri: i }
                })}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
            <Row>
                <OnlineText>ONLINE</OnlineText>
            </Row>
            <Col>
                <Theme.TextB size="22px" color="#05626e">{profile.name}</Theme.TextB>
                <Theme.Text size="14px" color="#000000" style={{ marginTop: 2 }}>{profile.email}</Theme.Text>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 200 }}>
                    <Div>
                        <Theme.IconCal style={{ marginRight: 4, marginTop: 4 }} />
                        <Theme.Text color="#000000">24 yrs</Theme.Text>
                    </Div>
                    <Div>
                        <Theme.IconScale style={{ marginRight: 4, marginTop: 4 }} />
                        <Theme.Text color="#000000">5'4"</Theme.Text>
                    </Div>
                    <Div>
                        <Theme.IconChat style={{ marginRight: 4, marginTop: 4 }} />
                        <Theme.Text color="#000000">Hindi</Theme.Text>
                    </Div>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 200 }}>
                    <Div>
                        <Theme.IconLocation style={{ marginRight: 4, marginTop: 4 }} />
                        <Theme.Text color="#000000">Nagpur, Maharastra</Theme.Text>
                    </Div>
                </View>
            </Col>
            <ProfileDetails>
                <PDetailContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Profession</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Fashion Designer</Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Highest Qualification</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Bachelor of Arts</Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Oparated by</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Self</Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Hobby</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Painting</Theme.Text>
                    </LabelContainer>
                </PDetailContainer>
                <VBar></VBar>
                <PDetailContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Post marriage plan</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Doing business</Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Religion</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Hindu</Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Religion subsection</Theme.Text>
                        <Theme.Text size="14px" color="#000000">Rajput</Theme.Text>
                    </LabelContainer>
                </PDetailContainer>
            </ProfileDetails>


            <BtnContainer>
                <TouchableOpacity>
                    <BtnViewProfile>
                        <Theme.TextB size="14px" color="#ffffff">VIEW FULL PROFILE</Theme.TextB>
                    </BtnViewProfile>
                </TouchableOpacity>
            </BtnContainer>

        </Container>
    );

}

export default ShrotProfile;