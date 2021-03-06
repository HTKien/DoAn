using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL;
using Entities;

namespace BL
{
    public class ScoreBL
    {
        private ScoreDL _scoreDL = new ScoreDL();
        
        public IEnumerable<Score> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _scores = _scoreDL.GetScore();
            _scores = _scores.OrderBy(p => p.Point)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _scores;

        }
    }
}
