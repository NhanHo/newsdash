import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faTimes } from '@fortawesome/free-solid-svg-icons'

import css from './Settings.sass'
import getApp from '../../store/selectors/app'
import getOrm from '../../store/selectors/orm'
import { importState, updateSettings } from '../../store/actions/app'

const makeSliderMarks = (min, max, step) => {
  let marks = {}
  for (let i = min; i <= max; i += step) {
    marks = { ...marks, [i]: i }
  }
  return marks
}

const gridColMin = 1
const gridColMax = 12
const gridColStep = 1
const gridColMarks = makeSliderMarks(gridColMin, gridColMax, gridColStep)

const fetchIntervalMin = 5
const fetchIntervalMax = 60
const fetchIntervalStep = 5
const fetchIntervalMarks = makeSliderMarks(fetchIntervalMin, fetchIntervalMax, fetchIntervalStep)

const feedItemsToKeepIntervalMin = 20
const feedItemsToKeepIntervalMax = 200
const feedItemsToKeepIntervalStep = 20
const feedItemsToKeepIntervalMarks = makeSliderMarks(
  feedItemsToKeepIntervalMin, feedItemsToKeepIntervalMax, feedItemsToKeepIntervalStep
)

const Settings = ({ setShowSettings }) => {
  const dispatch = useDispatch()

  const {
    corsProxy: oldCorsProxy,
    faviconProxy: oldFaviconProxy,
    feedItemsToKeep: oldFeedItemsToKeep,
    fetchInterval: oldFetchInterval,
    gridCols: oldGridCols,
  } = useSelector(getApp)
  const ormState = useSelector(getOrm)

  const [gridCols, setGridCols] = useState(oldGridCols)
  const [corsProxy, setCorsProxy] = useState(oldCorsProxy)
  const [faviconProxy, setFaviconProxy] = useState(oldFaviconProxy)
  const [fetchInterval, setFetchInterval] = useState(oldFetchInterval)
  const [feedItemsToKeep, setFeedItemsToKeep] = useState(oldFeedItemsToKeep)
  const [importData, setImportData] = useState()

  return (
    <div className={css.settings}>
      <h1>Settings</h1>

      <form>
        <div className={css.row}>
          <span>Grid columns</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={gridCols}
              marks={gridColMarks}
              max={gridColMax}
              min={gridColMin}
              step={gridColStep}
              onChange={(val) => {
                setGridCols(val)
                dispatch(updateSettings({ gridCols: val }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <span>Feed fetch interval (min)</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={fetchInterval / 60 / 1000}
              marks={fetchIntervalMarks}
              max={fetchIntervalMax}
              min={fetchIntervalMin}
              step={fetchIntervalStep}
              onChange={(val) => {
                const valMilli = val * 60 * 1000
                setFetchInterval(valMilli)
                dispatch(updateSettings({ fetchInterval: valMilli }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <span>Keep feed items</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={feedItemsToKeep}
              marks={feedItemsToKeepIntervalMarks}
              max={feedItemsToKeepIntervalMax}
              min={feedItemsToKeepIntervalMin}
              step={feedItemsToKeepIntervalStep}
              onChange={(val) => {
                setFeedItemsToKeep(val)
                dispatch(updateSettings({ feedItemsToKeep: val }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <label htmlFor="faviconProxyInput">Favicon proxy</label>
          <input
            id="faviconProxyInput"
            onChange={(ev) => {
              const val = ev.currentTarget.value.trim()
              setFaviconProxy(val)
              dispatch(updateSettings({ faviconProxy: val }))
            }}
            type="text"
            value={faviconProxy}
          />
        </div>

        <div className={css.row}>
          <label htmlFor="corsProxyInput">CORS proxy</label>
          <input
            id="corsProxyInput"
            onChange={(ev) => {
              const val = ev.currentTarget.value.trim()
              setCorsProxy(val)
              dispatch(updateSettings({ corsProxy: val }))
            }}
            type="text"
            value={corsProxy}
          />
        </div>
      </form>

      <h1>Import/Export</h1>

      <form>
        <div className={classNames(css.row, css.rowFull)}>
          <p>
            You can transfer your settings to another computer by copying it
            from the export field and pasting it into the input field.
          </p>
        </div>

        <div className={css.row}>
          <label htmlFor="importInput">Import</label>
          <div className={css.inputAndButton}>
            <input
              id="importInput"
              onChange={(ev) => setImportData(ev.currentTarget.value.trim())}
              type="text"
            />
            <button
              className={css.button}
              onClick={() => dispatch(importState(JSON.parse(importData)))}
              type="button"
            >
              <FontAwesomeIcon icon={faFileImport} />
              Import
            </button>
          </div>
        </div>

        <div className={css.row}>
          <label htmlFor="exportInput">Export</label>
          <input
            id="exportInput"
            onFocus={(ev) => ev.target.select()}
            readOnly
            type="text"
            value={JSON.stringify(ormState)}
          />
        </div>
      </form>

      <button
        aria-label="Close settings"
        className={css.buttonClose}
        onClick={() => setShowSettings(false)}
        title="Close settings"
        type="button"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
}

Settings.propTypes = {
  setShowSettings: PropTypes.func.isRequired,
}

export default Settings
