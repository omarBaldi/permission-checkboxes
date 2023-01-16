import { useEffect, useRef, useState } from 'react';
import './App.css';

const checkboxesLabels = ['read', 'write', 'delete'] as const;
type CheckboxLabel = typeof checkboxesLabels[number];

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

  return (
    <div className='App'>
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
            {Object.entries(checkboxes).map(([cbKey, cbValue], _: number) => {
              const currentKey = cbKey as CheckboxLabel;
              const label =
                currentKey === 'read'
                  ? 'Read'
                  : currentKey === 'write'
                  ? 'Write'
                  : 'Delete';

              return (
                <div key={`cb-${cbKey}`} style={{ margin: '0 0.5rem' }}>
                  <label htmlFor={cbKey}>{label}</label>
                  <input type='checkbox' name={cbKey} checked={cbValue} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
