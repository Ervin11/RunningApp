import React, {Component} from 'react';
import { NavigationEvents} from "react-navigation";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {BarChart, PieChart} from "react-native-chart-kit";
import {onSignIn} from "../auth/Auth";


export default class Profile extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            datacourses: [],
            datausers: [],
            isLoading: false
        };

    }

    render() {
        const dataCoursesFinished = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{

                /*
                TODO casse ici
                 */
                // undefined => pourquoi ?
                data: [500,400,1000,600,300,0,0,0,0,0,0,0]
            }]
        }
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: 'lightblue'}}>
                    <View style={{flex: 1,backgroundColor: 'white',flexDirection: 'row',alignContent:'stretch',paddingTop:10, justifyContent: 'center', paddingBottom: 30}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold',textAlign:'center'}}>PROFIL</Text>
                    </View>

                    <View style={{flex: 4, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={{backgroundColor: 'lightgreen', width: 150, height:200}}>
                            <Text>// TODO si on a le temps, placer une image de profil</Text>
                        </View>

                        <View style={{backgroundColor: 'yellow'}}>
                            <View style={{marginTop:40}}>
                                <Button
                                    //buttonStyle={styles.buttonConnection}
                                    title="Déconnection"
                                    type="solid"
                                    color="#2C5077"
                                    // onPress={handleSubmit}
                                    onPress={() => {
                                        // this.props.navigation.navigate('Home');
                                        onSignIn().then(() => this.props.navigation.navigate('SignedIn'));
                                    }}
                                />
                            </View>
                        </View>
                    </View>



                </View>
                <View style={{flex: 2, backgroundColor: 'green'}}>
                    <BarChart
                        data={dataCoursesFinished}
                        width={500}
                        height={300}
                        chartConfig={{
                        backgroundGradientFrom: "#1E2923",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#08130D",
                        backgroundGradientToOpacity: 0.5,
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        strokeWidth: 2, // optional, default 3
                        barPercentage: 0.5
                    }}
                    />
                </View>


                <NavigationEvents
                    onDidFocus={() => console.log('test')}
                />

            </View>
        )
    }

}
