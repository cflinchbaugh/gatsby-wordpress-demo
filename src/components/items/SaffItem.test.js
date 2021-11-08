import React from 'react';
import { act, screen } from '@testing-library/react';
import StaffItem from './StaffItem';

let data;

beforeEach(() => {
    data = {
        employeeData: {
            profession: ['Barber']
        },
        title: 'Employee Title',
        profileImage: <div>Image Placeholder Here</div>
    };
})

describe('render', () => {
    describe('when employee is of profession Barber', () => {
        it('the barbericon is rendered', async () => {
            const tree = render(<StaffItem {...data}/>),
                barberIcons = await screen.findByAltText('Barbers Icon');

            expect(barberIcons.length).toBe(1);
        })
    })
})