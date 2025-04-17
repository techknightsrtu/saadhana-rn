import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Helper function to parse a date string in "DD-MM-YYYY" format
const parseDate = (dateStr) => {
  const parts = dateStr.split('-'); // parts: [day, month, year]
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

const GraphOfScore = ({ labels = [], data = [] }) => {
  // Compute the boundaries for the current week (Monday as first day)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  // If today is Sunday (0), treat it as 7 for Monday calculation
  const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
  const mondayOffset = 1 - adjustedDay; // offset to Monday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + mondayOffset);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Filter the labels and data to only include entries from the current week
  const filteredLabels = [];
  const filteredData = [];

  // Use the assumption that labels and data arrays have matching indices
  labels.forEach((label, index) => {
    const dateObj = parseDate(label);
    if (dateObj >= startOfWeek && dateObj <= endOfWeek) {
      // Store only the day of month (as a string) for x-axis label
      filteredLabels.push(dateObj.getDate().toString());
      filteredData.push(data[index]);
    }
  });

  // Prepare a header string showing the current week's date range
  const headerDate = `${startOfWeek.toLocaleDateString(undefined, { day: 'numeric', month: 'long' })} - ${endOfWeek.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}`;

  // If no saadhana scores are available for the current week, display a message.
  if (filteredLabels.length === 0 || filteredData.length === 0) {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Current Week: {headerDate}
        </Text>
        <Text style={{ fontSize: 16, color: '#555' }}>You have not filled saadhana of current week.</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Header displaying the current week's date range */}
      <View style={{ alignItems: 'center', marginVertical: 10,}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold',color:'black'  }}>Current Week: {headerDate}</Text>
      </View>

      <LineChart
        data={{
          labels: filteredLabels,
          datasets: [
            {
              data: filteredData,
            },
          ],
        }}
        width={Dimensions.get('window').width - 30}
        height={220}
        yAxisSuffix=" pts"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginTop: 40,
        }}
      />
    </View>
  );
};

export default GraphOfScore;
