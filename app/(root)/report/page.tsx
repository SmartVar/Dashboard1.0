import Report from '@/components/reports/Report';

const Page = () => {
  // These can come from API, props, or state
  const reports = [
    'Monthly Report',
    'Quarterly Summary',
    'Annual Review',
    'Special Audit',
  ];

  const divisions = ['NMD', 'RGD', 'PLG', 'NSK', 'MLG', 'THN'];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Division Report Status Tracker</h1>
      <Report reports={reports} divisions={divisions} />
    </main>
  );
}

export default Page