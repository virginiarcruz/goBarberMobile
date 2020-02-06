import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, DateButton, DateText } from './styles';

export default function DateTimeInput({ date, onChange }) {
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const SelectDate = new Date(year, month, day);

      onChange(SelectDate);
    }
  }
  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" size={20} color="#fff" />
        <DateText> {dateFormatted} </DateText>
      </DateButton>
    </Container>
  );
}
