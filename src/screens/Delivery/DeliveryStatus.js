import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  Header,
  LineDivider,
  TextButton,
  TextIconButton,
} from "../../component";
import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";

const DeliveryStatus = ({ navigation }) => {
	const [currentStep, setCurrentStep] = useState(2);
	const renderHeader = () => {
		return (
			<Header
				title='DELIVERY STATUS'
				containerStyle={{
					height: 50,
					marginHorizontal: SIZES.padding,
					marginTop: 40,
				}}
			/>
		);
	};
	const renderTrackOrder = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
					paddingVertical: SIZES.padding,
					borderRadius: SIZES.radius,
					borderWidth: 2,
					borderColor: COLORS.lightGray2,
					backgroundColor: COLORS.white2,
				}}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 20,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Track Order</Text>
					<Text style={{ color: COLORS.gray, ...FONTS.body3 }}>NY012345</Text>
				</View>
				<LineDivider
					lineStyle={{
						backgroundColor: COLORS.lightGray2,
					}}
				/>

				{/* Status */}
				<View
					style={{
						marginTop: SIZES.padding,
						paddingHorizontal: SIZES.padding,
					}}>
					{constants.track_order_status.map((item, index) => {
						return (
							<View key={`StatusList-${index}`}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginVertical: -5,
									}}>
									<Image
										source={
											index <= currentStep
												? icons.check_circle_active
												: icons.check_circle_inactive
										}
										style={{
											width: 40,
											height: 40,
										}}
									/>
									<View style={{ marginLeft: SIZES.radius }}>
										<Text style={{ ...FONTS.h3 }}>{item.title}</Text>
										<Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
											{item.sub_title}
										</Text>
									</View>
								</View>
								{index < constants.track_order_status.length - 1 && (
									<View>
										{index < currentStep && (
											<View
												style={{
													height: 50,
													width: 3,
													marginLeft: 18,
													backgroundColor: COLORS.primary,
													zIndex: -1,
												}}
											/>
										)}
										{index >= currentStep && (
											<View
												style={{
													height: 50,
													width: 3,
													marginLeft: 18,
													backgroundColor: COLORS.lightGray2,
													zIndex: -1,
												}}
											/>
										)}
									</View>
								)}
							</View>
						);
					})}
				</View>
			</View>
		);
	};
	const renderFooter = () => {
		return (
			<View
				style={{
					marginTop: SIZES.radius,
					marginBottom: SIZES.padding,
				}}>
				{currentStep < constants.track_order_status.length - 1 && (
						<TextButton
						buttonStyle={{
							borderRadius: SIZES.base,
							backgroundColor: COLORS.lightGray2,
							height: 55
						}}
						label='Cancel'
						labelStyle={{
							color: COLORS.primary,
						}}
						onPress={() => navigation.navigate("Home")}
					/>
				)}

				{currentStep == constants.track_order_status.length - 1 && (
					<TextButton
						buttonContainerStyle={{
							height: 55,
							borderRadius: SIZES.base,
						}}
						label='DONE'
						onPress={() => navigation.navigate("Home")}
					/>
				)}
			</View>
		);
	};

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header */}
      {renderHeader()}

			{/* Track Order */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{renderTrackOrder()}
			</ScrollView>
			{renderFooter()}
		</View>
	);
};
export default DeliveryStatus;
