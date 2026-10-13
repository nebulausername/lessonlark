/** Etikett für erfundene Beispielinhalte. Jeder Wert mit `sample: true` steht neben genau so einem. */
export function SampleTag({ className = '' }: { className?: string }) {
  return (
    <span className={`sample-tag ${className}`} data-sample-tag="">
      Sample
    </span>
  );
}
