import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

const AddCard = ({ navigation, route }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [cardNumber, setCardNumber] = useState("");
	const [cardNumberError, setCardNumberError] = useState("");
	const [cardName, setCardName] = useState("");
	const [cardNameError, setCardNameError] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [expiryDateError, setExpiryDateError] = useState("");
	const [cvv, setCvv] = useState("");
	const [cvvError, setCvvError] = useState("");
	const [isRemember, setIsRemember] = useState("");

	useEffect(() => {
		let { selectedCard } = route.params;
		setSelectedCard(selectedCard);
	}, []);

	function isEnableAddCard() {
		return (
			cardNumber != "" &&
			cardName != "" &&
			expiryDate != "" &&
			cvv != "" &&
			cardNumberError == "" &&
			cardNameError == "" &&
			expiryDateError == "" &&
			cvvError == ""
		);
	}

	const renderHeader = () => {
		return (
			<Header
				title='ADD NEW CARD'
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
					source={selectedCard?.icons}
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
					keyboardType='number-pad'
					maxLength={19}
					value={cardNumber}
					onChange={(value) => {
						setCardNumber(
							value
								.replace(/\s/g, "")
								.replace(/(\d{4})/g, "$1 ")
								.trim()
						);
						utils.validateInput(value, 19, setCardNumberError);
					}}
					errorMsg={cardNumberError}
					appendComponent={
						<FormInputCheck value={cardNumber} error={cardNumberError} />
					}
				/>

				<FormInput
					label='Cardholder Name'
					value={cardName}
					containerStyle={{
						marginTop: SIZES.radius,
					}}
					onChange={(value) => {
						utils.validateInput(value, 1, setCardNameError);
						setCardName(value);
					}}
					errorMsg={cardNameError}
					appendComponent={
						<FormInputCheck value={cardName} error={cardNameError} />
					}
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
						maxLength={5}
						containerStyle={{
							flex: 1,
						}}
						onChange={(value) => {
							utils.validateInput(value, 5, setExpiryDateError);
							setExpiryDate(value);
						}}
						appendComponent={
							<FormInputCheck value={expiryDate} error={expiryDateError} />
						}
					/>
					<FormInput
						label='CVV'
						value={cvv}
						maxLength={3}
						containerStyle={{
							flex: 1,
							marginLeft: SIZES.radius,
						}}
						onChange={(value) => {
							utils.validateInput(value, 3, setCvvError);
							setCvv(value);
						}}
						appendComponent={<FormInputCheck value={cvv} error={cvvError} />}
					/>
				</View>
				<View
					style={{
						alignItems: "flex-start",
						marginTop: SIZES.padding,
					}}>
					<RadioButton
						label='Remember this card details'
						isSelected={isRemember}
						onPress={() => setIsRemember(!isRemember)}
					/>
				</View>
			</View>
		);
	};
	const renderFooter = () => {
		return (
			<View
				style={{
					paddingTop: SIZES.radius,
					paddingBottom: SIZES.padding,
					paddingHorizontal: SIZES.padding,
				}}>
				<TextButton
					label='Add Card'
					disabled={!isEnableAddCard()}
					buttonStyle={{
						height: 60,
						borderRadius: SIZES.radius,
						backgroundColor: isEnableAddCard()
							? COLORS.primary
							: COLORS.transparentPrimary,
					}}
					onPress={() => navigation.goBack()}
				/>
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
			{renderFooter()}
		</View>
	);
};

export default AddCard;
