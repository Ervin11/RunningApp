import React, {Component} from 'react'
import {TextInput, View, StyleSheet, KeyboardAvoidingView, ImageBackground, ScrollView} from 'react-native'
import {Button, Text, Icon} from 'react-native-elements'
import {Formik} from 'formik'
import * as yup from 'yup'
import DatePicker from 'react-native-datepicker'



export class Inscription extends Component {

	constructor(props) {

		super(props)

		this.state = {
			date: ""
		}
	}

	onClickListener = (values) => {

		if (values.prenom || values.prenom !== " ") {

			if (values.email) {

				if (values.password) {

					this.registerCall(values)

				} else {

					console.log("Please enter email")
				}

			} else {

				console.log("Please enter email")
			}

		} else {

			console.log("Please enter username")
		}
	}

	registerCall(values) {

		let date = values.birthDate.replace('/', '-').replace('/', '-') + "T00:00:00"
		let birthDate = new Date(date)
		let weight = parseInt(values.poids)

		fetch(`http://192.168.43.242:8000/api/users`, {

			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"firstname": values.prenom,
				"lastname": values.nom,
				"email": values.email,
				"birthDate": birthDate,
				"weight": weight,
				"password": values.password
			})

		}).then((response) => {

			let json = response.json();

			if (response.status >= 200 && response.status < 300) {
				this.props.navigation.navigate('Login')
				return json;
			} else {
				return json.then(Promise.reject.bind(Promise, 500));
			}

		})
			.catch(err => {
				console.log(err)
			})
	}

	render() {

		const validationSchema = yup.object().shape({

			email: yup.string()
				.label('Email')
				.email('Veuillez entrer un email valide')
				.ensure()
				.required('Champ obligatoire'),

			password: yup.string()
				.label('Password')
				.required('Champ obligatoire'),

			passwordVerify: yup.string()
				.label('Password verify')
				.required('Champ obligatoire'),

			prenom: yup.string()
				.label('Prénom')
				.required('Champ obligatoire'),

			nom: yup.string()
				.label('Nom')
				.required('Champ obligatoire'),

			birthDate: yup.string()
				.label('Date de naissance')
				.required('Champ obligatoire'),

			poids: yup.string()
				.label('Poids')
				.required('Champ obligatoire')
		})

		return (

			<KeyboardAvoidingView
				contentContainerStyle={styles.keyboard}
				behavior={"padding"}
				enabled
				keyboardVerticalOffset={10}
			>

				<ScrollView>

					<View style={styles.view}>

						{ /* HEADER */ }

						<ImageBackground
							source={require('../assets/img/Inscription.png')}
							style={styles.headerLogo}
						>

							<Text style={styles.headerText}>Inscription</Text>

						</ImageBackground>

						{ /* REGISTRATION FORM */ }

						<Formik

							initialValues={{
								email: '',
								prenom: '',
								nom: '',
								password: '',
								passwordVerify: '',
								birthDate: '',
								poids: 0,
							}}

							onSubmit={values => this.onClickListener(values)}
							validationSchema={validationSchema}
						>

							{({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (

								<View style={styles.view}>

									<View>

										{ /* FIRSTNAME INPUT AND ERROR TEXT */ }

										<View style={styles.inputSection}>

											<TextInput
												style={styles.textInput}
												value={values.prenom}
												onChangeText={handleChange('prenom')}
												onBlur={handleBlur('prenom')}
												placeholder={'Prénom'}
												underlineColorAndroid="transparent"
											/>

											<Icon
												name='user'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 15, top: -10}}
											/>

										</View>


										<Text style={{color: 'red', marginTop: 5}}>{touched.prenom && errors.prenom}</Text>

										{ /* LASTNAME INPUT AND ERROR TEXT */ }

										<View style={styles.inputSection}>

											<TextInput
												style={styles.textInput}
												onChangeText={handleChange('nom')}
												onBlur={handleBlur('nom')}
												placeholder={'Nom'}
											/>

											<Icon
												name='user'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 15, top: -10}}
											/>

										</View>

										<Text style={{color: 'red', marginTop: 5}}>{touched.nom && errors.nom}</Text>

										{ /* EMAIL INPUT AND ERROR TEXT */ }

										<View style={styles.inputSection}>

											<TextInput
												style={styles.textInput}
												onChangeText={handleChange('email')}
												onBlur={handleBlur('email')}
												placeholder={'Adresse email'}
											/>

											<Icon
												name='envelope-open'
												type='font-awesome'
												color='#2C5077'
												size={20}
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 14, top: -8}}
											/>

										</View>

										<Text style={{color: 'red', marginTop: 5}}>{touched.email && errors.email}</Text>

										{ /* PASSWORD AND PASSWORD CHECK INPUT AND ERROR TEXT */ }


										<View style={styles.inputSection}>

											<TextInput
												style={styles.textInput}
												onChangeText={handleChange('password')}
												onBlur={handleBlur('password')}
												type={'password'}
												placeholder={'Mot de passe'}
												secureTextEntry
											/>

											<Icon
												name='lock'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 16, top: -8}}
											/>

										</View>

										<Text style={{color: 'red', marginTop: 5}}>{touched.password && errors.password}</Text>

										<View style={styles.inputSection}>

											<TextInput
												style={styles.textInput}
												onChangeText={handleChange('passwordVerify')}
												onBlur={handleBlur('passwordVerify')}
												type={'password'}
												placeholder={'Retapez le mot de passe'}
												secureTextEntry
											/>

											<Icon
												name='lock'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 16, top: -8}}
											/>

										</View>

										<Text style={{color: 'red', marginTop: 5}}>{touched.passwordVerify && errors.passwordVerify}</Text>


										{ /* DATE INPUT AND ERROR TEXT */ }

										<DatePicker
											style={{ width: 280, marginTop: 5 }}
											date={this.state.date}
											mode="date"
											placeholder="Date de naissance"
											format="YYYY/MM/DD"
											minDate="01/01/1940"
											iconComponent={
												<Icon
													name='calendar'
													type='font-awesome'
													color='#2C5077'
													size={21}
													iconStyle={{
														position: 'absolute',
														right: 14,
													}}
												/>
											}
											customStyles={{
												dateInput: {
													borderRadius: 5,
													borderColor: '#989898',
													height: 44
												},
												dateText: {
													fontSize: 17
												},
												placeholderText: {
													fontSize: 17,
													textAlign: 'left',
													alignSelf: 'stretch',
													paddingLeft: 16
												}
											}}
											onDateChange={(birthDate) => {
												this.setState({date: birthDate})
												values.birthDate = birthDate
											}}
										/>

										<Text style={{color: 'red', marginTop: 5}}>{touched.birthDate && errors.birthDate}</Text>

										{ /* WEIGHT INPUT */ }

										<View style={styles.inputSection}>

											<TextInput
												keyboardType={'phone-pad'}
												style={styles.textInput}
												onChangeText={handleChange('poids')}
												onBlur={handleBlur('poids')}
												placeholder={'Poids'}
											/>

											<Icon
												name='balance-scale'
												type='font-awesome'
												color='#2C5077'
												style={styles.searchIcon}
												size={20}
												iconStyle={{ position: 'absolute', right: 10, top: -8}}
											/>

										</View>

										<Text style={{color: 'red', marginTop: 5}}>{touched.poids && errors.poids}</Text>

										<View style={{alignItems: "center"}}>
											<Button
												buttonStyle={{
													backgroundColor: '#2C5077',
													width: 200,
													height: 50,
													marginBottom: 40,
													marginTop: 20
												}}
												title="Inscription"
												color="#2C5077"
												type="solid"
												onPress={handleSubmit}
											/>
										</View>

									</View>

								</View>
							)}
						</Formik>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({

	view: {

		alignItems: 'center',
		flex: 1,
	},

	textInput: {

		width: 280,
		marginTop: 5,
		alignItems: 'center',
		alignSelf: 'stretch',
		paddingVertical: 7,
		paddingLeft: 16,
		borderColor: '#989898',
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 17
	},

	keyboard: {

		marginBottom: 0
	},

	headerLogo: {

		height: 60,
		width: 240,
		position: 'relative',
		top: 2,
		left: 2,
		marginTop: 40,
		marginBottom: 30
	},

	headerText: {

		fontSize: 20,
		color: 'white',
		top: 13,
		left: 0,
		textAlign: 'center'
	},

	inputSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},

})


export default Inscription

