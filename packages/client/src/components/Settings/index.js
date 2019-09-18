import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import ApiCheck from './ApiCheck'
import AppSettings from './AppSettings'
import ImportExport from './ImportExport'
import css from './Settings.sass'

const Settings = ({ setShowSettings }) => (
  <div className={css.settings}>
    <div>
      <AppSettings />
      <ImportExport setShowSettings={setShowSettings} />
      <ApiCheck />
    </div>
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

Settings.propTypes = {
  setShowSettings: PropTypes.func.isRequired,
}

export default Settings
