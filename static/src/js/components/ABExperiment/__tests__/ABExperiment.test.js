import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import * as hooks from '../../../hooks/useExperiment'

import ABExperiment from '../ABExperiment'

Enzyme.configure({ adapter: new Adapter() })

function setup(overideProps) {
  const props = {
    experimentId: 'test',
    ...overideProps
  }

  const enzymeWrapper = shallow(
    <ABExperiment {...props}>
      {({ variant }) => (
        <div className="ab-experiment-child">
          Variant:
          {' '}
          {variant}
        </div>
      )}
    </ABExperiment>
  )

  return {
    enzymeWrapper,
    props
  }
}

describe('ABExperiment component', () => {
  describe('when passed an experiment id', () => {
    test('calls the useExperiment hook with the correct arguments', () => {
      jest.spyOn(hooks, 'default').mockImplementation(() => ('0'))
      setup()

      expect(hooks.default).toHaveBeenCalledTimes(1)
      expect(hooks.default).toHaveBeenCalledWith('test')
    })
  })

  describe('when no variants mapping is provided', () => {
    test('should render the correct child component', () => {
      jest.spyOn(hooks, 'default').mockImplementation(() => ('0'))
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('.ab-experiment-child').length).toEqual(1)
      expect(enzymeWrapper.find('.ab-experiment-child').text()).toEqual('Variant: 0')
    })
  })

  describe('when a variants mapping is provided', () => {
    describe('for the default mapping', () => {
      test('should render the correct child component', () => {
        jest.spyOn(hooks, 'default').mockImplementation(() => ('0'))
        const { enzymeWrapper } = setup({
          variants: {
            0: 'default',
            1: 'first',
            2: 'second'
          }
        })

        expect(enzymeWrapper.find('.ab-experiment-child').length).toEqual(1)
        expect(enzymeWrapper.find('.ab-experiment-child').text()).toEqual('Variant: default')
      })
    })

    describe('for the first mapping', () => {
      test('should render the correct child component', () => {
        jest.spyOn(hooks, 'default').mockImplementation(() => ('1'))
        const { enzymeWrapper } = setup({
          variants: {
            0: 'default',
            1: 'first',
            2: 'second'
          }
        })

        expect(enzymeWrapper.find('.ab-experiment-child').length).toEqual(1)
        expect(enzymeWrapper.find('.ab-experiment-child').text()).toEqual('Variant: first')
      })
    })

    describe('for the first mapping', () => {
      test('should render the correct child component', () => {
        jest.spyOn(hooks, 'default').mockImplementation(() => ('2'))
        const { enzymeWrapper } = setup({
          variants: {
            0: 'default',
            1: 'first',
            2: 'second'
          }
        })

        expect(enzymeWrapper.find('.ab-experiment-child').length).toEqual(1)
        expect(enzymeWrapper.find('.ab-experiment-child').text()).toEqual('Variant: second')
      })
    })
  })
})
