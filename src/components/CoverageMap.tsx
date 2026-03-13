'use client'

import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import usStates from 'us-atlas/states-10m.json'

type CoverageState = {
  name: string
  label: string
  note?: string
}

const coverageStates: CoverageState[] = [
  { name: 'Connecticut', label: 'Connecticut' },
  { name: 'Illinois', label: 'Illinois' },
  { name: 'Indiana', label: 'Indiana' },
  { name: 'Kansas', label: 'Kansas' },
  { name: 'Kentucky', label: 'Kentucky' },
  { name: 'Mississippi', label: 'Mississippi' },
  { name: 'Missouri', label: 'Missouri' },
  { name: 'New Mexico', label: 'New Mexico' },
  { name: 'Ohio', label: 'Ohio' },
  { name: 'New York', label: 'New York' },
  { name: 'Pennsylvania', label: 'Pennsylvania' },
  { name: 'Delaware', label: 'Delaware' },
  { name: 'Maryland', label: 'Maryland' },
  { name: 'District of Columbia', label: 'Washington, D.C.' },
  { name: 'Virginia', label: 'Virginia' },
  { name: 'West Virginia', label: 'West Virginia' },
  { name: 'North Carolina', label: 'North Carolina' },
  { name: 'South Carolina', label: 'South Carolina' },
  { name: 'Georgia', label: 'Georgia' },
  { name: 'Alabama', label: 'Alabama' },
  { name: 'Florida', label: 'Florida' },
  { name: 'Texas', label: 'Texas' },
  { name: 'Oklahoma', label: 'Oklahoma' },
  { name: 'Arkansas', label: 'Arkansas' },
  { name: 'Louisiana', label: 'Louisiana' },
]

const CoverageMap = () => {
  const [activeStateName, setActiveStateName] = useState('Tennessee')
  const coverageStateNames = useMemo(
    () => new Set(coverageStates.map((state) => state.name)),
    [],
  )

  const activeState = useMemo(
    () => coverageStates.find((state) => state.name === activeStateName),
    [activeStateName],
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal-500">Service Area Map</p>
      </div>

      <div className="relative overflow-hidden bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_50%,#e2e8f0_100%)] p-3 sm:p-4">
        <div className="absolute inset-0 surface-grid opacity-35" />
        <div className="relative rounded-xl border border-white/70 bg-white/60 p-2 backdrop-blur-sm">
          <ComposableMap
            projection="geoAlbersUsa"
            width={980}
            height={560}
            className="h-auto w-full"
          >
            <Geographies geography={usStates as Record<string, unknown>}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoName = (geo.properties?.name as string) || ''
                  const isServed = coverageStateNames.has(geoName)
                  const isActive = geoName === activeStateName

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (isServed) {
                          setActiveStateName(geoName)
                        }
                      }}
                      style={{
                        default: {
                          fill: isActive ? '#dc2626' : isServed ? '#1b3468' : '#e2e8f0',
                          stroke: '#cbd5e1',
                          strokeWidth: 0.7,
                          outline: 'none',
                          cursor: isServed ? 'pointer' : 'default',
                          transition: 'fill 180ms ease',
                        },
                        hover: {
                          fill: isServed ? '#264887' : '#e2e8f0',
                          stroke: '#94a3b8',
                          strokeWidth: 0.9,
                          outline: 'none',
                          cursor: isServed ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: '#b91c1c',
                          stroke: '#94a3b8',
                          strokeWidth: 0.9,
                          outline: 'none',
                          cursor: isServed ? 'pointer' : 'default',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <p className="text-sm text-charcoal-700">
          Selected area: <span className="font-semibold">{activeState?.label || 'Coverage area'}</span>
          {activeState?.note ? <span className="ml-2 text-charcoal-500">({activeState.note})</span> : null}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {coverageStates.map((state) => (
            <button
              key={`chip-${state.name}`}
              type="button"
              onClick={() => setActiveStateName(state.name)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                state.name === activeStateName
                  ? 'border-rust-200 bg-rust-50 text-rust-700'
                  : 'border-slate-200 bg-slate-50 text-charcoal-600 hover:border-slate-300'
              }`}
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoverageMap
