import { configureToMatchImageSnapshot } from "jest-image-snapshot"
import { expect } from "vitest"

//Extensions
const toMatchImageSnapshot = configureToMatchImageSnapshot(JSON.parse(process.env.imageSnapshotConfig)) //Defined in vitest config
expect.extend({ toMatchImageSnapshot })
