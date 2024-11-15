import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphOfScore=({labels,data})=>{
    return(
        <View>
        {labels.length>0 && data.length>0?(<LineChart
            data={{
                labels:labels,
                datasets: [
                    {
                        data:data
                    }
                ]
            }}
            width={Dimensions.get("window").width-30} // from react-native
            height={220}
            yAxisLabel=""
            

            yAxisSuffix=" pts"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16, 
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
                marginTop:40
            }}
        />):(null)}
        </View>
    )
}
export default GraphOfScore