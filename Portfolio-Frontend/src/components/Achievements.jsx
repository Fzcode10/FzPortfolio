import React, { useEffect, useRef } from 'react';
import { Trophy, Flame, Code2, Target, Medal } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import './Achievements.css';

const { achievements } = portfolioData;

const mainStats = [
  { value: achievements.leetcodeProblems, label: 'LeetCode Problems Solved', icon: Code2, color: '#7C5CFF' },
  { value: achievements.codingStreak, label: 'Consecutive Coding Streak', icon: Flame, color: '#FF6B35' },
  { value: achievements.submissions, label: 'Submissions Over Past Year', icon: Target, color: '#4F7CFF' },
  { value: achievements.peakRating, label: 'Peak Contest Rating', icon: Trophy, color: '#FFB800' },
];

export default function Achievements() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" className="section" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-label reveal">Competitive Coding</div>
          <h2 className="section-title reveal reveal-delay-1">Coding & Achievements</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            My journey on LeetCode — consistency, problem solving and continuous improvement.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="ach__stats-grid">
          {mainStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`ach-stat-card reveal reveal-delay-${i + 1}`}
              >
                <div
                  className="ach-stat-card__icon"
                  style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30`, color: stat.color }}
                >
                  <Icon size={22} />
                </div>
                <div className="ach-stat-card__value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="ach-stat-card__label">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Contest Details */}
        <div className="ach__contests reveal reveal-delay-3">
          <div className="ach__contests-header">
            <Medal size={20} />
            <h3>Contest Performances</h3>
            <span className="ach__contests-total">{achievements.contests} Contests Participated</span>
          </div>
          <div className="ach__contests-grid">
            {achievements.contestsDetails.map((contest, i) => (
              <div key={i} className="contest-card">
                <div className="contest-card__icon">
                  <Trophy size={18} />
                </div>
                <div className="contest-card__info">
                  <div className="contest-card__name">{contest.name}</div>
                  <div className="contest-card__rank">
                    <span className="contest-card__rank-label">Rank</span>
                    <span className="contest-card__rank-value">{contest.rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
