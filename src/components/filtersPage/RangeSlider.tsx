import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { RangeSliderProps } from '@/types/componentTypes';

const RangeSlider = ({ min, max }: RangeSliderProps) => {
    return (
        <div className='flex flex-col'>
            <Slider
                range
                allowCross={false}
                // value={[min, max]}
                min={min}
                max={max}
                step={0.1}
                defaultValue={[min, max]}
                // onChange={(value: any) => setRange(value)}
                trackStyle={{ backgroundColor: '#4d6d7e', height: '3px', margin: '0px auto' }}
                railStyle={{ height: '2px' }}
                handleStyle={{
                    backgroundColor: '#4d6d7e',
                    opacity: '1',
                    border: '#4d6d7e',
                    width: '12px',
                    height: '12px'
                }}
            />
            <div className='flex justify-between *:text-[#4d6d7e] font-medium'>  
                <div className=''>
                    {min}%
                </div>
                <div className=''>
                    {max}%
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
