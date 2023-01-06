import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import cardApi from "../../api/cardApi";
import {
	FormInput,
	FormInputCheck,
	Header,
	IconButton,
	RadioButton,
	TextButton,
} from "../../component";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";
import Utils from "../../utils";

const CardDetail = ({ navigation, route }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvv, setCvv] = useState("");

	useEffect(() => {
		let { selectedCard } = route.params;
		if(selectedCard.name) {
			setCardNumber(selectedCard.number);
			setCardName(selectedCard.name);
			setExpiryDate(selectedCard.expire_date);
			setCvv(selectedCard.cvv);
		}
		setSelectedCard(selectedCard);
	}, []);

	const renderHeader = () => {
		return (
			<Header
				title='CARD DETAIL'
				containerStyle={{
					height: 50,
					marginHorizontal: SIZES.padding,
					marginTop: 40,
				}}
				leftComponent={
					<IconButton
						icon={icons.back}
						containerStyle={{
							width: 40,
							height: 40,
							justifyContent: "center",
							alignItems: "center",
							borderWidth: 1,
							borderRadius: SIZES.radius,
							borderColor: COLORS.gray2,
						}}
						iconStyle={{
							width: 20,
							height: 20,
							tintColor: COLORS.gray2,
						}}
						onPress={() => navigation.goBack()}
					/>
				}
				rightComponent={
					<View
						style={{
							width: 40,
						}}
					/>
				}
			/>
		);
	};
	const renderCard = () => {
		return (
			<ImageBackground
				source={images.card}
				style={{
					height: 200,
					width: "100%",
					marginTop: SIZES.radius,
					borderRadius: SIZES.radius,
					overflow: "hidden",
				}}>
				{/* Logo */}
				<Image
					source={selectedCard?.icon}
					resizeMode='contain'
					style={{
						position: "absolute",
						bottom: 12,
						right: 10,
						height: 40,
						width: 80,
					}}
				/>
				<View
					style={{
						position: "absolute",
						bottom: 10,
						left: 10,
						right: 0,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text
						style={{
							color: COLORS.black,
							...FONTS.h3,
						}}>
						{cardName}
					</Text>
					<View
						style={{
							flexDirection: "row",
						}}>
						<Text style={{ flex: 1, color: COLORS.black, ...FONTS.body3 }}>
							{cardNumber}
						</Text>
					</View>
				</View>
			</ImageBackground>
		);
	};
	const renderForm = () => {
		const { utils } = Utils;
		return (
			<View style={{ marginTop: SIZES.padding * 2 }}>
				<FormInput
					label='Card Number'
					value={cardNumber}
          editable={false}
				/>

				<FormInput
					label='Cardholder Name'
					value={cardName}
					containerStyle={{
						marginTop: SIZES.radius,
					}}
          editable={false}
				/>

				<View
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
					}}>
					<FormInput
						label='Expire Date'
						value={expiryDate}
						placeholder='MM/YY'
						containerStyle={{
							flex: 1,
						}}
            editable={false}
					/>
					<FormInput
						label='CVV'
						value={cvv}
						containerStyle={{
							flex: 1,
							marginLeft: SIZES.radius,
						}}
            editable={false}
					/>
				</View>
			</View>
		);
	};
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}>
			{renderHeader()}
			<KeyboardAwareScrollView
				keyboardDismissMode='on-drag'
				contentContainerStyle={{
					flexGrow: 1,
					paddingHorizontal: SIZES.padding,
				}}>
				{renderCard()}
				{renderForm()}
			</KeyboardAwareScrollView>
		</View>
	);
};

export default CardDetail;
