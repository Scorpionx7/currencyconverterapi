import Select from '../../ui/Select/Select';
import { CURRENCIES } from '../../../utils/constants';

const CurrencySelect = ({ label, value, onChange, ...props }) => {
  return (
    <Select label={label} value={value} onChange={onChange} {...props}>
      {CURRENCIES.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.flag} {currency.code} - {currency.name}
        </option>
      ))}
    </Select>
  );
};

export default CurrencySelect;
