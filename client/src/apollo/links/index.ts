import { from } from '@apollo/client'

import http from './http'
import useToken from './useToken'

export default from([useToken, http])
