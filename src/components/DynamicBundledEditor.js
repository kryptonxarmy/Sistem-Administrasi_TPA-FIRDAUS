// components/DynamicBundledEditor.js
import dynamic from 'next/dynamic'

const DynamicBundledEditor = dynamic(() => import('./BundledEditor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

export default DynamicBundledEditor