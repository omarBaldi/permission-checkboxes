import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InputCheckbox, InputCheckboxProps } from './components/input-checkbox';
import './App.css';

const checkboxesLabels = ['read', 'write', 'delete'] as const;
export type CheckboxLabel = typeof checkboxesLabels[number];

type CheckboxesState = Record<CheckboxLabel, boolean>;

function App() {
  const numberRows = useRef(6);
  const [mainState, setMainState] = useState<Map<number, CheckboxesState>>(new Map());

  /**
   * As soon as the component is mounted, I need to
   * loop through the number of rows and for each one
   * set the default value for the checkboxes state
   */
  useEffect(() => {
    const defaultState: CheckboxesState = {
      read: false,
      write: false,
      delete: false,
    };

    const newMainState = [...Array(numberRows.current)]
      .map((_, index: number) => index + 1)
      .reduce((acc, rowId) => {
        acc.set(rowId, { ...defaultState });

        return acc;
      }, new Map());

    setMainState(newMainState);

    //* cleanup
    return () => {
      setMainState(new Map());
    };
  }, []);

  const handleCheckboxChange = useCallback(
    ({
      rowId,
      key,
      updatedValue,
    }: Parameters<InputCheckboxProps['onCheckboxChange']>[0]): void => {
      if (typeof rowId === 'undefined') return;

      setMainState((prevMainState) => {
        const updatedMainState = new Map(prevMainState);
        const previousCheckboxesState = updatedMainState.get(rowId);

        if (typeof previousCheckboxesState === 'undefined') {
          return prevMainState;
        }

        updatedMainState.set(
          rowId,
          key === 'delete'
            ? {
                ...Object.fromEntries(
                  Object.entries(previousCheckboxesState).map(([key, _]) => [
                    [key],
                    updatedValue,
                  ])
                ),
              }
            : { ...previousCheckboxesState, [key]: updatedValue }
        );

        return updatedMainState;
      });
    },
    []
  );

  const handleCheckboxAllChange = useCallback(
    ({
      key,
      updatedValue,
    }: Parameters<InputCheckboxProps['onCheckboxChange']>[0]): void => {
      setMainState((prevMainState) => {
        const updatedMainState = new Map(
          [...prevMainState].map(([rowId, checkboxes]) => {
            return [rowId, { ...checkboxes, [key]: updatedValue }];
          })
        );

        return updatedMainState;
      });
    },
    []
  );

  const isCheckboxAllChecked = (type: CheckboxLabel): boolean => {
    return [...mainState.values()].every((v) => v[type]);
  };

  return (
    <div className='App'>
      <React.Fragment>
        <div
          style={{
            marginBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          <InputCheckbox
            checkboxKey='read'
            checked={isCheckboxAllChecked('read')}
            label='Read all'
            onCheckboxChange={handleCheckboxAllChange}
          />
          <InputCheckbox
            checkboxKey='write'
            checked={isCheckboxAllChecked('write')}
            label='Write all'
            onCheckboxChange={handleCheckboxAllChange}
          />
          <InputCheckbox
            checkboxKey='delete'
            checked={isCheckboxAllChecked('delete')}
            label='Delete all'
            onCheckboxChange={handleCheckboxAllChange}
          />
        </div>

        <hr />
      </React.Fragment>

      {[...mainState].map(([rowId, checkboxes]: [number, CheckboxesState], _: number) => {
        return (
          <div
            key={rowId}
            style={{
              margin: '0.5rem 0',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
            }}
          >
            {Object.entries(checkboxes).map(([key, value], _: number) => {
              const currentKey = key as CheckboxLabel;
              const label =
                currentKey === 'read'
                  ? 'Read'
                  : currentKey === 'write'
                  ? 'Write'
                  : 'Delete';

              return (
                <InputCheckbox
                  key={`cb-${currentKey}`}
                  checkboxKey={currentKey}
                  checked={value}
                  label={label}
                  rowId={rowId}
                  onCheckboxChange={handleCheckboxChange}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
