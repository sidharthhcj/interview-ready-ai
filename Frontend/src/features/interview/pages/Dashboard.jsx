import React from 'react'
import { useNavigate, Link } from 'react-router'
import '../style/dashboard.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth'

const Dashboard = () => {

    const { loading, reports } = useInterview()
    const { user } = useAuth()
    const navigate = useNavigate()

    const avgScore = reports.length > 0
        ? Math.round(reports.reduce((sum, r) => sum + (r.matchScore || 0), 0) / reports.length)
        : 0

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your dashboard...</h1>
            </main>
        )
    }

    return (
        <div className='dashboard'>

            {/* Hero / Welcome Section */}
            <section className='dashboard-hero'>
                <div className='dashboard-hero__text'>
                    <p className='dashboard-hero__greeting'>Welcome back</p>
                    <h1 className='dashboard-hero__title'>
                        Hello, <span>{user?.username || 'there'}</span> 👋
                    </h1>
                    <p className='dashboard-hero__subtitle'>
                        Get AI-powered interview preparation tailored to any job. Upload your resume, paste the job description, and let AI build your strategy.
                    </p>
                </div>
                <Link to="/create-interview" className='dashboard-hero__cta'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Create Interview Plan
                </Link>
            </section>

            {/* Stats Row */}
            <section className='dashboard-stats'>
                <div className='stat-card'>
                    <div className='stat-card__icon stat-card__icon--reports'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <div className='stat-card__info'>
                        <p className='stat-card__value'>{reports.length}</p>
                        <p className='stat-card__label'>Total Reports</p>
                    </div>
                </div>

                <div className='stat-card'>
                    <div className='stat-card__icon stat-card__icon--score'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <div className='stat-card__info'>
                        <p className='stat-card__value'>{avgScore}%</p>
                        <p className='stat-card__label'>Avg Match Score</p>
                    </div>
                </div>

                <div className='stat-card'>
                    <div className='stat-card__icon stat-card__icon--plans'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </div>
                    <div className='stat-card__info'>
                        <p className='stat-card__value'>{reports.length}</p>
                        <p className='stat-card__label'>Plans Generated</p>
                    </div>
                </div>
            </section>

            {/* Recent Reports */}
            {reports.length > 0 ? (
                <section className='dashboard-reports'>
                    <div className='dashboard-reports__header'>
                        <h2>Recent Interview Plans</h2>
                        <span className='dashboard-reports__count'>{reports.length} reports</span>
                    </div>
                    <div className='report-grid'>
                        {reports.map(report => {
                            const scoreClass = report.matchScore >= 80 ? 'report-card__score--high'
                                : report.matchScore >= 60 ? 'report-card__score--mid'
                                    : 'report-card__score--low'

                            return (
                                <div
                                    key={report._id}
                                    className='report-card'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3 className='report-card__title'>
                                        {report.title || 'Untitled Position'}
                                    </h3>
                                    <div className='report-card__meta'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'short', day: 'numeric'
                                        })}
                                    </div>
                                    <div className='report-card__footer'>
                                        <span className={`report-card__score ${scoreClass}`}>
                                            Match: {report.matchScore}%
                                        </span>
                                        <span className='report-card__view'>
                                            View Details
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            ) : (
                <section className='dashboard-empty'>
                    <div className='dashboard-empty__icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="12" y1="18" x2="12" y2="12" />
                            <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                    </div>
                    <h3 className='dashboard-empty__title'>No interview plans yet</h3>
                    <p className='dashboard-empty__text'>
                        Create your first AI-powered interview preparation plan to get started.
                    </p>
                    <Link to="/create-interview" className='dashboard-empty__cta'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Create Your First Plan
                    </Link>
                </section>
            )}
        </div>
    )
}

export default Dashboard
